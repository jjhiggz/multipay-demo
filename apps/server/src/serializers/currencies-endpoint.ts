import { VALID_CURRENCY_CODES } from "@/constants/currency.constants";
import type { s } from "@/zod-schemas";
import { z } from "zod";

export const xeCurrencyEndpointResultSchema = z.array(
  z.object({
    amountPrecision: z.number(),
    isoCode: z.string(),
    name: z.string(),
    canBuy: z.boolean(),
    canSell: z.boolean(),
    sameCurrencySupported: z.boolean(),
    marketOrderEnabled: z.boolean(),
  })
);

export function serializeCurrenciesEndpoint(
  userToCurrencies: z.infer<(typeof s)["userToCurrencies"]["insert"]>[]
): z.infer<typeof xeCurrencyEndpointResultSchema> {
  return userToCurrencies.map((userCurrency) => {
    const currencyInfo = VALID_CURRENCY_CODES.find(
      (c) => c.code === userCurrency.currencyIsoCode
    );
    if (!currencyInfo)
      throw new Error(`Invalid currency code: ${userCurrency.currencyIsoCode}`);

    return {
      amountPrecision: 2, // Default precision since it's not in VALID_CURRENCY_CODES
      isoCode: currencyInfo.code,
      name: currencyInfo.name,
      canBuy: true,
      canSell: true,
      sameCurrencySupported: true,
      marketOrderEnabled: true,
    };
  });
}
