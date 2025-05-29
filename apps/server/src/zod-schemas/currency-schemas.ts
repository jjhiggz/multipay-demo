import { VALID_CURRENCY_CODES, type CurrencyCode } from "@/constants/currency.constants";
import z from "zod";

export const currencyCodeSchema = z.enum(
  VALID_CURRENCY_CODES.map((n) => n.code) as [CurrencyCode]
);