import { auth } from "../lib/auth";
import { z } from "zod";
import { db } from "../db";
import { recipient, profile, userToCurrencies } from "../db/schema/auth-schema";
import { eq } from "drizzle-orm";
import {
  xeProfileResponseSchema,
  mapToXeProfileResponse,
} from "../serializers/profile-to-xe-profile";
import { handleZodFailure } from "@/utils/promise-handlers";
import { SyncPromise } from "@/utils/sync-promise";
import {
  serializeCurrenciesEndpoint,
  xeCurrencyEndpointResultSchema,
} from "../serializers/currencies-endpoint";
import { os } from "@orpc/server";
import { userExistsMiddleware, type Context } from "../lib/context";
import { systemFieldsOutputSchema } from "@/db/schema/system-fields.schema";
import { defaultSystemFieldsReturn } from "@/constants/system-fields-return";
import {
  createQuoteInputSchema,
  createQuoteResponse,
  deliveryMethodSchema,
  getQuoteById,
  getQuoteResponseSchema,
  individualQuoteSchema,
} from "@/serializers/get-quotes";
import {
  countryCodeSchema,
  countryCodeSchema,
  currencyCodeSchema,
  currencyCodeSchema,
  currencyCodeSchema,
  s,
} from "@/zod-schemas";
import {
  countryCodes,
  countryCodes,
  type CountryCode,
} from "@/constants/country.constants";

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

const getSystemFieldsRoute = os
  .route({ method: "GET", path: "/system/fields" })
  .output(systemFieldsOutputSchema)
  .handler(async () => {
    return defaultSystemFieldsReturn;
  });

const postQuote = os
  .route({ method: "POST", path: "/quote" })
  .input(
    z.object({
      userCountry: countryCodeSchema,
      countryTo: countryCodeSchema,
      amount: z.number().nullable(),
      amountTo: z.number().nullable(),
      sellCcy: currencyCodeSchema,
      buyCcy: currencyCodeSchema,
      fixedCcy: currencyCodeSchema,
      screen: z.string(),
      platflormType: z.string(),
      shouldCalcAmountFrom: z.boolean(),
      promotionCodes: z.array(z.unknown()),
      deliveryMethod: deliveryMethodSchema,
    })
  )
  .output(
    z.object({
      quote: z.object({
        buyCcy: currencyCodeSchema,
        sellCcy: currencyCodeSchema,
        fixedCcy: currencyCodeSchema,
        baseCcy: currencyCodeSchema,
        quoteId: z.string(),
        // TODO: Maybe we should look at this and refine this in the future
        quoteStatus: z.string(),
        deliveryMethod: deliveryMethodSchema,
        // float
        fixedAmountInUsd: z.number(),
        countryTo: z.enum(countryCodes as [CountryCode]),
        individualQuotes: z.array(individualQuoteSchema),
        offeredDeliveryMethods: z.array(
          z.object({
            method: deliveryMethodSchema,
            isEnabled: z.boolean(),
            cashOpenPaymentAvailable: z.boolean(),
          })
        ),
        infoMessages: z.unknown(),
        warnMessages: z.unknown(),
        errorMessages: z.unknown(),
        expiryTimeMillis: z.number(),
        availableSettlementProxies: z.array(z.unknown()),
        provideRecipientLater: z.boolean(),
      }),
      warning: z.string(),
    })
  )
  .handler(async (c) => {
    return await createQuoteResponse(c.input);
  });

const getQuote = os
  .route({ method: "GET", path: "/quote/:quoteId" })
  .input(
    z.object({
      quoteId: z.string(),
      refreshPaymentMethods: z.boolean(),
      paymentMethod: z.string().optional(),
      language: z.string().optional(),
      country: z.string().optional(),
      platformType: z.string().optional(),
    })
  )
  .output(
    z.object({
      quote: z.object({
        buyCcy: currencyCodeSchema,
        sellCcy: currencyCodeSchema,
        fixedCcy: currencyCodeSchema,
        baseCcy: currencyCodeSchema,
        quoteId: z.string(),
        // TODO: Maybe we should look at this and refine this in the future
        quoteStatus: z.string(),
        deliveryMethod: deliveryMethodSchema,
        // float
        fixedAmountInUsd: z.number(),
        countryTo: z.enum(countryCodes as [CountryCode]),
        individualQuotes: z.array(individualQuoteSchema),
        offeredDeliveryMethods: z.array(
          z.object({
            method: deliveryMethodSchema,
            isEnabled: z.boolean(),
            cashOpenPaymentAvailable: z.boolean(),
          })
        ),
        infoMessages: z.unknown(),
        warnMessages: z.unknown(),
        errorMessages: z.unknown(),
        expiryTimeMillis: z.number(),
        availableSettlementProxies: z.array(z.unknown()),
        provideRecipientLater: z.boolean(),
      }),
      warning: z.string(),
    })
  )
  .handler(async (c) => {
    return getQuoteById(c.input.quoteId);
  });

// New unified router object
export const newAppRouter = {
  healthcheck: healthcheckRoute,
  getSystemFieldsRoute,
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
  postQuote,
  getQuote,
};

export type NewAppRouter = typeof newAppRouter;
