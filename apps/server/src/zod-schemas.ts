import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  user,
  session,
  account,
  verification,
  organization,
  member,
  invitation,
  recipient,
  profile,
  currency,
  userToCurrencies,
} from "./db/schema/auth-schema";
import {
  VALID_CURRENCY_CODES,
  type CurrencyCode,
} from "./constants/currency.constants";
import { z } from "zod";
const currencyCode = z.enum(
  VALID_CURRENCY_CODES.map((n) => n.code) as [CurrencyCode]
);

// User schemas
export const s = {
  currency: {
    insert: createInsertSchema(currency, {
      isoCode: currencyCode,
    }),
    select: createSelectSchema(currency, {
      isoCode: currencyCode,
    }),
  },
  userToCurrencies: {
    insert: createInsertSchema(userToCurrencies, {
      currencyIsoCode: currencyCode,
    }),
    select: createSelectSchema(userToCurrencies, {
      currencyIsoCode: currencyCode,
    }),
  },
  user: {
    insert: createInsertSchema(user),
    select: createSelectSchema(user),
    refined: createInsertSchema(user, {
      email: (schema) => schema.email(),
      name: (schema) => schema.min(1),
    }),
  },
  session: {
    insert: createInsertSchema(session),
    select: createSelectSchema(session),
  },
  account: {
    insert: createInsertSchema(account),
    select: createSelectSchema(account),
  },
  verification: {
    insert: createInsertSchema(verification),
    select: createSelectSchema(verification),
  },
  organization: {
    insert: createInsertSchema(organization),
    select: createSelectSchema(organization),
  },
  member: {
    insert: createInsertSchema(member),
    select: createSelectSchema(member),
  },
  invitation: {
    insert: createInsertSchema(invitation),
    select: createSelectSchema(invitation),
  },
  recipient: {
    insert: createInsertSchema(recipient),
    select: createSelectSchema(recipient),
    refined: createInsertSchema(recipient, {
      recipientDisplayName: (schema) => schema.min(1),
      currencyCode: (schema) =>
        schema.refine((val) => currencyCode.safeParse(val).success, {
          message: "Invalid currency code",
        }),
      bankCountryCode: (schema) => schema.length(2),
      accountNumber: (schema) => schema.min(1),
    }),
  },
  profile: {
    insert: createInsertSchema(profile, {
      expectedTradeCurrency: currencyCode,
      regionalAccountingCurrency: currencyCode,
      expectedPayoutCurrency: currencyCode,
    }),
    select: createSelectSchema(profile, {
      expectedTradeCurrency: currencyCode,
      regionalAccountingCurrency: currencyCode,
      expectedPayoutCurrency: currencyCode,
    }),
  },
  currencyCode,
} as const;
