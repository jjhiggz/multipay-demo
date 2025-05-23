import type { CurrencyCode } from "@/constants/currency.constants";

export const getRate = async ({
  from,
  to,
}: {
  from: CurrencyCode;
  to: CurrencyCode;
}): Promise<number> => {
  const toUSDRates = await getUSDConversionRates();
  const rate = toUSDRates[from] / toUSDRates[to];
  return rate;
};

export const convertAmount = async ({
  from,
  to,
  amount,
}: {
  from: CurrencyCode;
  amount: number;
  to: CurrencyCode;
}) => {
  const toUSDRates = await getUSDConversionRates();
  const usds = toUSDRates[from] * amount;
  const newCurrency = usds / toUSDRates[to];
  return newCurrency;
};

export const getUSDConversionRates = async () => {
  return await Bun.file("./conversion-rates-to-usd.json").json();
};
