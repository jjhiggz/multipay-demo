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
import { handleZodFailure } from "@/utils/promise-handlers";
import { SyncPromise } from "@/utils/sync-promise";
import {
  serializeCurrenciesEndpoint,
  xeCurrencyEndpointResultSchema,
} from "../serializers/currencies-endpoint";
import { os } from "@orpc/server";
import { userExistsMiddleware, type Context } from "../lib/context";

const healthcheckRoute = os
  .route({ method: "GET", path: "/healthcheck" })
  .handler(() => "OK");

const signInRoute = os
  .route({ method: "POST", path: "/signIn" })
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(1),
    })
  )
  .handler(async ({ input }) => {
    return await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
      },
    });
  });

const getProfileRoute = os
  .$context<Context>()
  .use(userExistsMiddleware)
  .route({ method: "GET", path: "/profile" })
  .output(xeProfileResponseSchema)
  .handler(async ({ context }) => {
    const userProfileFromDb = await db
      .select()
      .from(profile)
      .where(eq(profile.userEmail, context.session.user.email))
      .then((rows) => rows[0]);

    if (!userProfileFromDb) {
      throw new Error("Profile not found");
    }
    const parsedProfile = s.profile.select.parse(userProfileFromDb);
    return mapToXeProfileResponse(parsedProfile);
  });

const getCurrenciesRoute = os
  .$context<Context>()
  .use(userExistsMiddleware)
  .route({ method: "GET", path: "/currencies" })
  .output(xeCurrencyEndpointResultSchema)
  .handler(async ({ context }) => {
    const userCurrenciesFromDb = await db
      .select()
      .from(userToCurrencies)
      .where(eq(userToCurrencies.userId, context.session.user.id));
    const parsedUserCurrencies = z
      .array(s.userToCurrencies.select)
      .parse(userCurrenciesFromDb);
    return serializeCurrenciesEndpoint(parsedUserCurrencies);
  });

const addCurrencyRoute = os
  .$context<Context>()
  .use(userExistsMiddleware)
  .route({ method: "POST", path: "/currencies" })
  .input(s.userToCurrencies.insert)
  .output(xeCurrencyEndpointResultSchema)
  .handler(async ({ input, context }) => {
    const [newCurrencyFromDb] = await db
      .insert(userToCurrencies)
      .values({
        ...input,
        userId: context.session.user.id,
      })
      .returning();
    const parsedNewCurrency =
      s.userToCurrencies.select.parse(newCurrencyFromDb);
    return serializeCurrenciesEndpoint([parsedNewCurrency]);
  });

const removeCurrencyRoute = os
  .$context<Context>()
  .use(userExistsMiddleware)
  .route({ method: "DELETE", path: "/currencies/:currencyCode" })
  .input(z.object({ currencyCode: s.currencyCode }))
  .output(xeCurrencyEndpointResultSchema)
  .handler(async ({ input, context }) => {
    await db
      .delete(userToCurrencies)
      .where(
        eq(userToCurrencies.userId, context.session.user.id) &&
          eq(userToCurrencies.currencyIsoCode, input.currencyCode)
      );

    const remainingCurrenciesFromDb = await db
      .select()
      .from(userToCurrencies)
      .where(eq(userToCurrencies.userId, context.session.user.id));
    const parsedRemainingCurrencies = z
      .array(s.userToCurrencies.select)
      .parse(remainingCurrenciesFromDb);
    return serializeCurrenciesEndpoint(parsedRemainingCurrencies);
  });

const legacyRecipientsOutputSchema = z.object({
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
});
const legacyRecipientsHandler = async ({
  input,
}: {
  input: { organizationId: string };
}) => {
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
};

const legacyXeProfileHandler = async ({
  input,
}: {
  input: { email: string };
}) => {
  let rowFromDb;
  try {
    rowFromDb = db
      .select()
      .from(profile)
      .where(eq(profile.email, input.email))
      .get();
  } catch (error) {
    console.error(error);
    throw error;
  }
  const parsedRow = s.profile.select.parse(rowFromDb);
  const serialized = await SyncPromise.resolve(parsedRow)
    .then(mapToXeProfileResponse)
    .then(xeProfileResponseSchema.parse)
    .catch(handleZodFailure)
    .unwrap();
  return serialized;
};

// New unified router object
export const newAppRouter = {
  healthcheck: healthcheckRoute,
  signIn: signInRoute,
  getProfile: getProfileRoute,
  getCurrencies: getCurrenciesRoute,
  addCurrency: addCurrencyRoute,
  removeCurrency: removeCurrencyRoute,
  recipients: os
    .route({ method: "POST", path: "/recipients" })
    .input(z.object({ organizationId: z.string() }))
    .output(legacyRecipientsOutputSchema)
    .handler(legacyRecipientsHandler),

  searchProfileByEmail: os
    .route({ method: "POST", path: "/profiles/search" })
    .input(z.object({ email: z.string().email() }))
    .output(xeProfileResponseSchema)
    .handler(legacyXeProfileHandler),
};

export type NewAppRouter = typeof newAppRouter;

// Delete or comment out old appRouter and its type
/*
export const appRouter = {
  // ... old appRouter definitions
};
export type AppRouter = typeof appRouter;
*/
