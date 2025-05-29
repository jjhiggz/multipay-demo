import { VALID_CURRENCY_CODES } from "@/constants/currency.constants";
import {maxForwardDaysByCurrency} from "./max-forward-days-by-currency"
import { z } from "zod";
import type { userToCurrencies } from "@/db/schema/auth-schema";

export const xeCurrencyEndpointResultSchema = z.array(
  z.object({
    amountPrecision: z.number(),
    isoCode: z.string(),
    name: z.string(),
    canBuy: z.boolean(),
    canSell: z.boolean(),
    sameCurrencySupported: z.boolean(),
    marketOrderEnabled: z.boolean(),
    maxForwardDays: z.number()
  })
);

export function serializeCurrenciesEndpoint(
  userToCurrenciesData: (typeof userToCurrencies.$inferSelect)[]
): z.infer<typeof xeCurrencyEndpointResultSchema> {
  return userToCurrenciesData.map((userCurrency) => {
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
      maxForwardDays: maxForwardDaysByCurrency[currencyInfo.code]
    };
  });
}
