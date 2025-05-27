export const SETTLEMENT_METHODS = [
  "DirectDebit",
  "BankTransfer",
  "FundsOnBalance",
  "MobileWallet",
] as const;

export const DELIVERY_METHODS = [
  "BankAccount",
  "CashPayout",
  "MobileWallet",
  "FundsOnBalance",
] as const;

export type SettlementMethod = (typeof SETTLEMENT_METHODS)[number];
export type DeliveryMethod = (typeof DELIVERY_METHODS)[number];
