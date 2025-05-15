import type { CurrencyCode } from "@/constants/currency.constants";
import { db } from "@/db";
import { user } from "@/db/schema/auth-schema";
import { userToCurrencies } from "@/db/schema/auth-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const _createUser = async ({
  email,
  name,
  password,
  currencies = [],
}: {
  email: string;
  name: string;
  password: string;
  currencies?: [
    CurrencyCode,
    Partial<{
      amountPrecision: number;
      canBuy: boolean;
      canSell: boolean;
      sameCurrencySupported: boolean;
      marketOrderEnabled: boolean;
    }>,
  ][];
}) => {
  return auth.api
    .signUpEmail({
      body: {
        email,
        name,
        password,
      },
    })
    .then(async (userData) => {
      await db
        .update(user)
        .set({ emailVerified: true })
        .where(eq(user.id, userData.user.id));

      // Insert userToCurrencies join records for each [isoCode, userCurrencyFields] tuple
      for (const [isoCode, userCurrency] of currencies) {
        await db
          .insert(userToCurrencies)
          .values({
            userId: userData.user.id,
            currencyIsoCode: isoCode,
            amountPrecision: userCurrency.amountPrecision ?? 2,
            canBuy: userCurrency.canBuy !== false,
            canSell: userCurrency.canSell !== false,
            sameCurrencySupported: userCurrency.sameCurrencySupported !== false,
            marketOrderEnabled: userCurrency.marketOrderEnabled ?? false,
          })
          .onConflictDoNothing();
      }

      return userData;
    })
    .catch((error) => {
      console.error("Failed to create user:", {
        email,
        name,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    });
};
