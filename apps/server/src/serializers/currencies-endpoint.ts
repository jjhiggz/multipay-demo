// Serializer for currencies endpoint
// Takes in joined userToCurrencies and currency rows and outputs the required shape

export type RawCurrencyRow = {
  amountPrecision: number;
  isoCode: string;
  name: string;
  canBuy: boolean;
  canSell: boolean;
  sameCurrencySupported: boolean;
  marketOrderEnabled: boolean;
};

export function serializeCurrenciesEndpoint(rows: RawCurrencyRow[]) {
  return rows.map((row) => ({
    amountPrecision: row.amountPrecision,
    isoCode: row.isoCode,
    name: row.name,
    canBuy: row.canBuy,
    canSell: row.canSell,
    sameCurrencySupported: row.sameCurrencySupported,
    marketOrderEnabled: row.marketOrderEnabled,
  }));
}
