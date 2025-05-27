import {
  DELIVERY_METHODS,
  SETTLEMENT_METHODS,
} from "@/constants/quote.constants";
import { z } from "zod";
import { countryCodeSchema, currencyCodeSchema } from "@/zod-schemas";
import { countryCodes, type CountryCode } from "@/constants/country.constants";
import { getRate } from "@/utils/quote-helpers";

export const settlementMethodSchema = z.enum(SETTLEMENT_METHODS);
export const deliveryMethodSchema = z.enum(DELIVERY_METHODS);

export const individualQuoteSchema = z.object({
  settlementMethod: z.enum(["DirectDebit", "BankTransfer", "FundsOnBalance"]),
  deliveryMethod: z.literal("BankAccount"),
  commissionProvider: z.string(),
  isDefault: z.boolean(),
  isEnabled: z.boolean(),
  nonFixedAmount: z.string(),
  fixedAmount: z.string(),
  sellAmount: z.string(),
  buyAmount: z.string(),
  rate: z.number(),
  inverseRate: z.number(),
  totalCostAmount: z.string(),
  liquidityManager: z.string(),
  valueDate: z.string(),
  balanceDate: z.string(),
  transferFee: z.string(),
  paymentMethodFee: z.string(),
  paymentMethodMarginFee: z.string(),
  paymentMethodMarginAdjustment: z.number(),
  leadTime: z.string(),
  paymentAmountRounded: z.boolean(),
});

const offeredDeliveryMethodsSchema = z.object({
  method: deliveryMethodSchema,
  isEnabled: z.boolean(),
  cashOpenPaymentAvailable: z.boolean(),
});

export const getQuoteResponseSchema = z.object({
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
    offeredDeliveryMethods: z.array(offeredDeliveryMethodsSchema),
    infoMessages: z.unknown(),
    warnMessages: z.unknown(),
    errorMessages: z.unknown(),
    expiryTimeMillis: z.number(),
    availableSettlementProxies: z.array(z.unknown()),
    provideRecipientLater: z.boolean(),
  }),
  warning: z.string(),
});

export const createQuoteInputSchema = z.object({
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
});

const writeQuote = async (quote: z.infer<typeof postQuoteResponseSchema>) => {
  await Bun.write(
    `./fake-db/quotes/${quote.quote.quoteId}`,
    JSON.stringify(quote, null, 2)
  );
};

const readQuote = async (
  quoteId: string
): Promise<z.infer<typeof postQuoteResponseSchema> | null> => {
  const quoteFile = await Bun.file(`./fake-db/quotes/${quoteId}`)
    .json()
    .then(postQuoteResponseSchema.parse)
    .catch(() => null);
  return quoteFile;
};

export const createQuoteResponse = async (
  input: z.infer<typeof createQuoteInputSchema>
): Promise<z.infer<typeof postQuoteResponseSchema>> => {
  const { sellCcy, buyCcy, amount, countryTo } = input;

  const rate = await getRate({ from: sellCcy, to: buyCcy });
  const inverseRate = await getRate({ from: buyCcy, to: sellCcy });
  const formattedAmount = amount?.toFixed(2) ?? "0.00";
  const convertedAmount = amount ? (amount * rate).toFixed(2) : "0.00";

  const quoteId = `Quote_${crypto.randomUUID()}`;

  const result: z.infer<typeof postQuoteResponseSchema> = {
    quote: {
      buyCcy,
      sellCcy,
      fixedCcy: sellCcy,
      baseCcy: sellCcy,
      quoteId,
      quoteStatus: "Quoted",
      deliveryMethod: "BankAccount",
      fixedAmountInUsd: amount ?? 0,
      countryTo,
      individualQuotes: [
        {
          settlementMethod: "DirectDebit",
          deliveryMethod: "BankAccount",
          commissionProvider: "XeDfx",
          isDefault: false,
          isEnabled: true,
          nonFixedAmount: convertedAmount,
          fixedAmount: formattedAmount,
          sellAmount: formattedAmount,
          buyAmount: convertedAmount,
          rate,
          inverseRate,
          totalCostAmount: `${sellCcy} ${formattedAmount}`,
          liquidityManager: "Trm",
          valueDate: "2025-05-21",
          balanceDate: "2025-05-15",
          transferFee: "0.00",
          paymentMethodFee: "0.00",
          paymentMethodMarginFee: "0.00",
          paymentMethodMarginAdjustment: 0.0,
          leadTime: "Typically 3 business days",
          paymentAmountRounded: false,
        },
      ],
      offeredDeliveryMethods: [
        {
          method: "BankAccount",
          isEnabled: true,
          cashOpenPaymentAvailable: false,
        },
        {
          method: "CashPayout",
          isEnabled: true,
          cashOpenPaymentAvailable: false,
        },
        {
          method: "MobileWallet",
          isEnabled: true,
          cashOpenPaymentAvailable: false,
        },
        {
          method: "FundsOnBalance",
          isEnabled: true,
          cashOpenPaymentAvailable: false,
        },
      ],
      infoMessages: {},
      warnMessages: {},
      errorMessages: {},
      expiryTimeMillis: 15000,
      availableSettlementProxies: [],
      provideRecipientLater: false,
      promotions: [],
    },
    warning:
      "<!-- Warning: Automatic extraction of rates is prohibited under the Terms of Use. -->",
  } as const;
  await writeQuote(result);
  console.log(result);
  return result;
};

export const getQuoteById = async (quoteId: string) => {
  const quote = await readQuote(quoteId);
  if (!quote) {
    throw new Error(`Quote not found: ${quoteId}`);
  }

  const { buyCcy, sellCcy } = quote.quote;
  const rate = await getRate({ from: sellCcy, to: buyCcy });

  // Update the individual quotes with the new rate
  const updatedQuote = {
    ...quote,
    quote: {
      ...quote.quote,
      individualQuotes: quote.quote.individualQuotes.map((quote) => ({
        ...quote,
        nonFixedAmount: (
          Number(quote.fixedAmount.replace(/,/g, "")) * rate
        ).toFixed(2),
      })),
    },
  };

  return updatedQuote;
};

export const postQuoteResponseSchema = z.object({
  quote: z.object({
    promotions: z.array(z.unknown()),
    countryTo: countryCodeSchema,
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
    individualQuotes: z.array(individualQuoteSchema),
    offeredDeliveryMethods: z.array(offeredDeliveryMethodsSchema),
    infoMessages: z.unknown(),
    warnMessages: z.unknown(),
    errorMessages: z.unknown(),
    expiryTimeMillis: z.number(),
    availableSettlementProxies: z.array(z.unknown()),
    provideRecipientLater: z.boolean(),
  }),
  warning: z.string(),
});

// Type Tests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postResponesExample: z.infer<typeof postQuoteResponseSchema> = {
  quote: {
    buyCcy: "GBP",
    sellCcy: "USD",
    fixedCcy: "USD",
    baseCcy: "USD",
    quoteId: "Quote_9f857151-71d4-43b6-a02c-8798707f9ae7",
    quoteStatus: "Quoted",
    deliveryMethod: "BankAccount",
    fixedAmountInUsd: 10000.0,
    countryTo: "GB",
    individualQuotes: [
      {
        settlementMethod: "DirectDebit",
        deliveryMethod: "BankAccount",
        commissionProvider: "XeDfx",
        isDefault: false,
        isEnabled: true,
        nonFixedAmount: "7,407.00",
        fixedAmount: "10,000.00",
        sellAmount: "10,000.00",
        buyAmount: "7,407.00",
        rate: 0.7407,
        inverseRate: 1.3501,
        totalCostAmount: "USD 10,000.00",
        liquidityManager: "Trm",
        valueDate: "2025-05-21",
        balanceDate: "2025-05-15",
        transferFee: "0.00",
        paymentMethodFee: "0.00",
        paymentMethodMarginFee: "0.00",
        paymentMethodMarginAdjustment: 0.0,
        leadTime: "Typically 3 business days",
        paymentAmountRounded: false,
      },
      {
        settlementMethod: "BankTransfer",
        deliveryMethod: "BankAccount",
        commissionProvider: "XeDfx",
        isDefault: false,
        isEnabled: true,
        nonFixedAmount: "7,407.00",
        fixedAmount: "10,000.00",
        sellAmount: "10,000.00",
        buyAmount: "7,407.00",
        rate: 0.7407,
        inverseRate: 1.3501,
        totalCostAmount: "USD 10,000.00",
        liquidityManager: "Trm",
        valueDate: "2025-05-16",
        balanceDate: "2025-05-16",
        transferFee: "0.00",
        paymentMethodFee: "0.00",
        paymentMethodMarginFee: "0.00",
        paymentMethodMarginAdjustment: 0.0,
        leadTime: "Typically within 24 hours",
        paymentAmountRounded: false,
      },
      {
        settlementMethod: "FundsOnBalance",
        deliveryMethod: "BankAccount",
        commissionProvider: "XeDfx",
        isDefault: false,
        isEnabled: true,
        nonFixedAmount: "7,407.00",
        fixedAmount: "10,000.00",
        sellAmount: "10,000.00",
        buyAmount: "7,407.00",
        rate: 0.7407,
        inverseRate: 1.3501,
        totalCostAmount: "USD 10,000.00",
        liquidityManager: "Trm",
        valueDate: "2025-05-16",
        balanceDate: "2025-05-16",
        transferFee: "0.00",
        paymentMethodFee: "0.00",
        paymentMethodMarginFee: "0.00",
        paymentMethodMarginAdjustment: 0.0,
        leadTime: "Typically within 24 hours",
        paymentAmountRounded: false,
      },
    ],
    offeredDeliveryMethods: [
      {
        method: "BankAccount",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
      {
        method: "CashPayout",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
      {
        method: "MobileWallet",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
      {
        method: "FundsOnBalance",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
    ],
    infoMessages: {},
    warnMessages: {},
    errorMessages: {},
    expiryTimeMillis: 15000,
    promotions: [],
    availableSettlementProxies: [],
    provideRecipientLater: false,
  },
  warning:
    "<!-- Warning: Automatic extraction of rates is prohibited under the Terms of Use. -->",
};

export const getResponseExample: z.infer<typeof postQuoteResponseSchema> = {
  quote: {
    buyCcy: "GBP",
    sellCcy: "USD",
    fixedCcy: "USD",
    baseCcy: "USD",
    quoteId: "Quote_9f857151-71d4-43b6-a02c-8798707f9ae7",
    quoteStatus: "Quoted",
    deliveryMethod: "BankAccount",
    fixedAmountInUsd: 10000.0,
    countryTo: "GB",
    individualQuotes: [
      {
        settlementMethod: "DirectDebit",
        deliveryMethod: "BankAccount",
        commissionProvider: "XeDfx",
        isDefault: false,
        isEnabled: true,
        nonFixedAmount: "7,408.00",
        fixedAmount: "10,000.00",
        sellAmount: "10,000.00",
        buyAmount: "7,408.00",
        rate: 0.7408,
        inverseRate: 1.3499,
        totalCostAmount: "USD 10,000.00",
        liquidityManager: "Trm",
        valueDate: "2025-05-21",
        balanceDate: "2025-05-15",
        transferFee: "0.00",
        paymentMethodFee: "0.00",
        paymentMethodMarginFee: "0.00",
        paymentMethodMarginAdjustment: 0.0,
        leadTime: "Typically 3 business days",
        paymentAmountRounded: false,
      },
      {
        settlementMethod: "BankTransfer",
        deliveryMethod: "BankAccount",
        commissionProvider: "XeDfx",
        isDefault: false,
        isEnabled: true,
        nonFixedAmount: "7,408.00",
        fixedAmount: "10,000.00",
        sellAmount: "10,000.00",
        buyAmount: "7,408.00",
        rate: 0.7408,
        inverseRate: 1.3499,
        totalCostAmount: "USD 10,000.00",
        liquidityManager: "Trm",
        valueDate: "2025-05-16",
        balanceDate: "2025-05-16",
        transferFee: "0.00",
        paymentMethodFee: "0.00",
        paymentMethodMarginFee: "0.00",
        paymentMethodMarginAdjustment: 0.0,
        leadTime: "Typically within 24 hours",
        paymentAmountRounded: false,
      },
      {
        settlementMethod: "FundsOnBalance",
        deliveryMethod: "BankAccount",
        commissionProvider: "XeDfx",
        isDefault: false,
        isEnabled: true,
        nonFixedAmount: "7,408.00",
        fixedAmount: "10,000.00",
        sellAmount: "10,000.00",
        buyAmount: "7,408.00",
        rate: 0.7408,
        inverseRate: 1.3499,
        totalCostAmount: "USD 10,000.00",
        liquidityManager: "Trm",
        valueDate: "2025-05-16",
        balanceDate: "2025-05-16",
        transferFee: "0.00",
        paymentMethodFee: "0.00",
        paymentMethodMarginFee: "0.00",
        paymentMethodMarginAdjustment: 0.0,
        leadTime: "Typically within 24 hours",
        paymentAmountRounded: false,
      },
    ],
    offeredDeliveryMethods: [
      {
        method: "BankAccount",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
      {
        method: "CashPayout",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
      {
        method: "MobileWallet",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
      {
        method: "FundsOnBalance",
        isEnabled: true,
        cashOpenPaymentAvailable: false,
      },
    ],
    infoMessages: {},
    warnMessages: {},
    errorMessages: {},
    expiryTimeMillis: 15000,
    availableSettlementProxies: [],
    provideRecipientLater: false,
    promotions: [],
  },
  warning:
    "<!-- Warning: Automatic extraction of rates is prohibited under the Terms of Use. -->",
};
