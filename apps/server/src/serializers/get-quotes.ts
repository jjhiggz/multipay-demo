import {
  DELIVERY_METHODS,
  SETTLEMENT_METHODS,
} from "@/constants/quote.constants";
import { z } from "zod";
import { currencyCodeSchema } from "@/zod-schemas";
import { countryCodes, type CountryCode } from "@/constants/country.constants";

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

export const getQuoteResponse = {
  quote: {
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
    countryto: z.enum(countryCodes as [CountryCode]),
    individualQuotes: z.array(individualQuoteSchema),
    offeredDeliveryMethods: z.array(offeredDeliveryMethodsSchema),
    infoMessages: z.unknown(),
    warnMessages: z.unknown(),
    errorMessages: z.unknown(),
    expiryTimeMillis: z.number(),
    availableSettlementProxies: z.array(z.unknown()),
    provideRecipientLater: z.boolean(),
  },
  warning: z.string(),
};
//
