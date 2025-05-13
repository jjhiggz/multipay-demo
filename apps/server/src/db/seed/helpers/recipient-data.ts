import type { CurrencyCode } from "@/constants/currency.constants";
import type { s } from "@/zod-schemas";
import type { z } from "zod";
import { faker } from "@faker-js/faker";

export const _getRecipientData = ({
  allowedCurrencies,
  count,
}: {
  allowedCurrencies: CurrencyCode[];
  count: number;
}): Omit<z.infer<(typeof s)["recipient"]["insert"]>, "organizationId">[] => {
  return Array.from({ length: count }).map((_, i) => {
    const currencyCode = allowedCurrencies[i % allowedCurrencies.length];
    return {
      recipientDisplayName: faker.person.fullName(),
      currencyCode,
      bankCountryCode: faker.location.countryCode("alpha-2"),
      bankName: faker.company.name(),
      accountNumber: faker.finance.accountNumber(),
    };
  });
};
