import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { auth } from "../lib/auth";
import { z } from "zod";
import { db } from "../db";
import { recipient, profile, userToCurrencies } from "../db/schema/auth-schema";
import { eq } from "drizzle-orm";
import {
  xeProfileResponseSchema,
  mapToXeProfileResponse,
} from "../serializers/profile-to-xe-profile";
import { s } from "@/zod-schemas";
import { handleZodFailure, logInfo } from "@/utils/promise-handlers";
import { SyncPromise } from "@/utils/sync-promise";
import {
  serializeCurrenciesEndpoint,
  xeCurrencyEndpointResultSchema,
} from "../serializers/currencies-endpoint";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .handler(async ({ input }) => {
      // Call Better Auth's sign-in API
      return await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
      });
    }),
  recipients: publicProcedure
    .input(z.object({ organizationId: z.string() }))
    .output(
      z.object({
        recipients: z.array(
          z.object({
            recipient: z.object({
              recipientId: z.number(),
              recipientDisplayName: z.string(),
              currencyCode: z.string(),
              bankCountryCode: z.string(),
              bankName: z.string(),
              accountNumber: z.string(),
            }),
            fields: z.array(
              z.object({
                name: z.string(),
                value: z.string(),
              })
            ),
          })
        ),
      })
    )
    .handler(async ({ input }) => {
      const rows = await db
        .select()
        .from(recipient)
        .where(eq(recipient.organizationId, input.organizationId));
      return {
        recipients: rows.map((r) => ({
          recipient: {
            recipientId: r.recipientId,
            recipientDisplayName: r.recipientDisplayName,
            currencyCode: r.currencyCode,
            bankCountryCode: r.bankCountryCode,
            bankName: r.bankName,
            accountNumber: r.accountNumber,
          },
          fields: [
            { name: "recipientId", value: String(r.recipientId) },
            { name: "recipientDisplayName", value: r.recipientDisplayName },
            { name: "currencyCode", value: r.currencyCode },
            { name: "bankCountryCode", value: r.bankCountryCode },
            { name: "bankName", value: r.bankName },
            { name: "accountNumber", value: r.accountNumber },
          ],
        })),
      };
    }),
  xeProfile: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .output(xeProfileResponseSchema)
    .handler(async ({ input }) => {
      let row;
      try {
        row = db
          .select()
          .from(profile)
          .where(eq(profile.email, input.email))
          .get();
      } catch (error) {
        console.error(error);
        throw error;
      }

      const serialized = await SyncPromise.resolve(row)
        .then(s.profile.select.parse)
        .then(mapToXeProfileResponse)
        .then(xeProfileResponseSchema.parse)
        .catch(handleZodFailure)
        .unwrap();

      return serialized;
    }),
  currencies: protectedProcedure
    .output(xeCurrencyEndpointResultSchema)
    .handler(async ({ context }) => {
      console.log(
        "currenciasdoifjapsoidfjaosidjfoasidjfoasijdfoiasjdfoiasdjfes"
      );
      const userId = context.session?.user?.id;
      if (!userId) throw new Error("Not authenticated");
      return SyncPromise.resolve(
        await db
          .select()
          .from(userToCurrencies)
          .where(eq(userToCurrencies.userId, userId))
      )
        .then(logInfo("1"))
        .then(z.array(s.userToCurrencies.select).parse)
        .then(logInfo("2"))
        .then(serializeCurrenciesEndpoint)
        .then(logInfo("3"))
        .catch(handleZodFailure)
        .unwrap();
    }),
};
export type AppRouter = typeof appRouter;
