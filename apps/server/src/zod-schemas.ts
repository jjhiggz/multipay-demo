import { z } from "zod";
import { countryCodes, type CountryCode } from "./constants/country.constants";
import { currencyCodeSchema } from "./zod-schemas/currency-schemas";

export const countryCodeSchema = z.enum(countryCodes as [CountryCode]);

// --- User Schemas ---
const userInsertSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
const userSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
const userRefinedInsertSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// --- Session Schemas ---
const sessionInsertSchema = z.object({
  id: z.string().optional(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  userId: z.string(),
  activeOrganizationId: z.string().optional(),
});
const sessionSelectSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  userId: z.string(),
  activeOrganizationId: z.string().optional(),
});

// --- Account Schemas ---
const accountInsertSchema = z.object({
  id: z.string().optional(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  idToken: z.string().optional(),
  accessTokenExpiresAt: z.date().optional(),
  refreshTokenExpiresAt: z.date().optional(),
  scope: z.string().optional(),
  password: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
const accountSelectSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  idToken: z.string().optional(),
  accessTokenExpiresAt: z.date().optional(),
  refreshTokenExpiresAt: z.date().optional(),
  scope: z.string().optional(),
  password: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// --- Verification Schemas ---
const verificationInsertSchema = z.object({
  id: z.string().optional(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
const verificationSelectSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// --- Organization Schemas ---
const organizationInsertSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional(),
  logo: z.string().optional(),
  createdAt: z.date().optional(),
  metadata: z.string().optional(),
});
const organizationSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  logo: z.string().optional(),
  createdAt: z.date(),
  metadata: z.string().optional(),
});

// --- Member Schemas ---
const memberInsertSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.date().optional(),
});
const memberSelectSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.date(),
});

// --- Invitation Schemas ---
const invitationInsertSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional(),
  status: z.string(),
  expiresAt: z.date(),
  inviterId: z.string(),
});
const invitationSelectSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional(),
  status: z.string(),
  expiresAt: z.date(),
  inviterId: z.string(),
});

// --- Recipient Schemas ---
const recipientInsertSchema = z.object({
  recipientId: z.number().optional(),
  organizationId: z.string(),
  recipientDisplayName: z.string(),
  currencyCode: z.string(),
  bankCountryCode: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
});
const recipientSelectSchema = z.object({
  recipientId: z.number(),
  organizationId: z.string(),
  recipientDisplayName: z.string(),
  currencyCode: z.string(),
  bankCountryCode: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
});
const recipientRefinedInsertSchema = z.object({
  recipientId: z.number().optional(),
  organizationId: z.string(),
  recipientDisplayName: z.string().min(1),
  currencyCode: currencyCodeSchema, // Using the existing currencyCodeSchema for validation
  bankCountryCode: z.string().length(2),
  bankName: z.string(),
  accountNumber: z.string().min(1),
});

// Manually defined currency schemas
const currencyInsertSchema = z.object({
  isoCode: currencyCodeSchema,
  name: z.string(),
});
const currencySelectSchema = z.object({
  isoCode: currencyCodeSchema,
  name: z.string(),
});

// Manually defined userToCurrencies schemas
const userToCurrenciesInsertSchema = z.object({
  userId: z.string(),
  currencyIsoCode: currencyCodeSchema,
  amountPrecision: z.number(),
  canBuy: z.boolean(),
  canSell: z.boolean(),
  sameCurrencySupported: z.boolean(),
  marketOrderEnabled: z.boolean(),
});
const userToCurrenciesSelectSchema = z.object({
  userId: z.string(),
  currencyIsoCode: currencyCodeSchema,
  amountPrecision: z.number(),
  canBuy: z.boolean(),
  canSell: z.boolean(),
  sameCurrencySupported: z.boolean(),
  marketOrderEnabled: z.boolean(),
});

// Manually defined profile schemas
const profileInsertSchema = z.object({
  profileId: z.number().optional(),
  userEmail: z.string(),
  onlineCredentialId: z.number(),
  clientId: z.number(),
  clientNumber: z.string(),
  accountType: z.string(),
  accountStatus: z.string(),
  accountKycStatus: z.string(),
  accountRestricted: z.boolean(),
  businessUnitId: z.number(),
  region: z.string(),
  brandRegionId: z.number(),
  trmBusinessUnitId: z.number(),
  fullNameFirstName: z.string(),
  fullNameLastName: z.string(),
  accountName: z.string(),
  freeFormatAddressLine1: z.string(),
  freeFormatAddressPlace: z.string(),
  freeFormatAddressCounty: z.string(),
  freeFormatAddressPostalCode: z.string(),
  addressLastModified: z.string(),
  country: z.string(),
  email: z.string(),
  emailLastModified: z.string(),
  mobileNumberPrefix: z.string(),
  mobileNumberPhone: z.string(),
  dateOfBirth: z.string(),
  termsAndConditionsAcceptedDate: z.string(),
  termsAndConditionsIsValid: z.boolean(),
  preferredLanguage: z.string(),
  kycRefreshDueDate: z.string(),
  kycRefreshStatus: z.string(),
  createdDate: z.string(),
  platform: z.string(),
  documentStatus: z.string(),
  featuresRpaEnabled: z.boolean(),
  featuresViewBalance: z.boolean(),
  featuresUseBalance: z.boolean(),
  featuresMarketOrder: z.boolean(),
  featuresQuickTransactionsEnabled: z.boolean(),
  sameCurrencySupported: z.boolean(),
  canProvideRecipientLater: z.boolean(),
  balancesEnabled: z.boolean(),
  transactionViewEnabled: z.boolean(),
  canSetupInputterAuthoriserUserRoles: z.boolean(),
  userRoleName: z.string(),
  userRolePrivileges: z.string(),
  expectedTradeCurrency: z.string(),
  expectedPayoutCurrency: z.string(),
  expectedAnnualTradingVolume: z.number(),
  regionalAccountingCurrency: z.string(),
  expectedVolumeInRegionalAccountingCurrency: z.number(),
  expectedFrequency: z.string(),
  onlineDirectDebitEnabled: z.boolean(),
  canUseOnlineDealing: z.boolean(),
  unitcode: z.string(),
  brandId: z.number(),
  lastTradedDate: z.string(),
  maxScheduledPaymentDays: z.number(),
  onlineCredentialStatus: z.string(),
  modifyRolesEnabled: z.boolean(),
});

const profileSelectSchema = z.object({
  profileId: z.number(),
  userEmail: z.string(),
  onlineCredentialId: z.number(),
  clientId: z.number(),
  clientNumber: z.string(),
  accountType: z.string(),
  accountStatus: z.string(),
  accountKycStatus: z.string(),
  accountRestricted: z.boolean(),
  businessUnitId: z.number(),
  region: z.string(),
  brandRegionId: z.number(),
  trmBusinessUnitId: z.number(),
  fullNameFirstName: z.string(),
  fullNameLastName: z.string(),
  accountName: z.string(),
  freeFormatAddressLine1: z.string(),
  freeFormatAddressPlace: z.string(),
  freeFormatAddressCounty: z.string(),
  freeFormatAddressPostalCode: z.string(),
  addressLastModified: z.string(),
  country: z.string(),
  email: z.string(),
  emailLastModified: z.string(),
  mobileNumberPrefix: z.string(),
  mobileNumberPhone: z.string(),
  dateOfBirth: z.string(),
  termsAndConditionsAcceptedDate: z.string(),
  termsAndConditionsIsValid: z.boolean(),
  preferredLanguage: z.string(),
  kycRefreshDueDate: z.string(),
  kycRefreshStatus: z.string(),
  createdDate: z.string(),
  platform: z.string(),
  documentStatus: z.string(),
  featuresRpaEnabled: z.boolean(),
  featuresViewBalance: z.boolean(),
  featuresUseBalance: z.boolean(),
  featuresMarketOrder: z.boolean(),
  featuresQuickTransactionsEnabled: z.boolean(),
  sameCurrencySupported: z.boolean(),
  canProvideRecipientLater: z.boolean(),
  balancesEnabled: z.boolean(),
  transactionViewEnabled: z.boolean(),
  canSetupInputterAuthoriserUserRoles: z.boolean(),
  userRoleName: z.string(),
  userRolePrivileges: z.string(),
  expectedTradeCurrency: currencyCodeSchema,
  expectedPayoutCurrency: currencyCodeSchema,
  expectedAnnualTradingVolume: z.number(),
  regionalAccountingCurrency: currencyCodeSchema,
  expectedVolumeInRegionalAccountingCurrency: z.number(),
  expectedFrequency: z.string(),
  onlineDirectDebitEnabled: z.boolean(),
  canUseOnlineDealing: z.boolean(),
  unitcode: z.string(),
  brandId: z.number(),
  lastTradedDate: z.string(),
  maxScheduledPaymentDays: z.number(),
  onlineCredentialStatus: z.string(),
  modifyRolesEnabled: z.boolean(),
});

// Main export object `s`
export const s = {
  currency: {
    insert: currencyInsertSchema,
    select: currencySelectSchema,
  },
  userToCurrencies: {
    insert: userToCurrenciesInsertSchema,
    select: userToCurrenciesSelectSchema,
  },
  user: {
    insert: userInsertSchema,
    select: userSelectSchema,
    refined: userRefinedInsertSchema,
  },
  session: {
    insert: sessionInsertSchema,
    select: sessionSelectSchema,
  },
  account: {
    insert: accountInsertSchema,
    select: accountSelectSchema,
  },
  verification: {
    insert: verificationInsertSchema,
    select: verificationSelectSchema,
  },
  organization: {
    insert: organizationInsertSchema,
    select: organizationSelectSchema,
  },
  member: {
    insert: memberInsertSchema,
    select: memberSelectSchema,
  },
  invitation: {
    insert: invitationInsertSchema,
    select: invitationSelectSchema,
  },
  recipient: {
    insert: recipientInsertSchema,
    select: recipientSelectSchema,
    refined: recipientRefinedInsertSchema,
  },
  profile: {
    insert: profileInsertSchema,
    select: profileSelectSchema,
  },
  currencyCode: currencyCodeSchema,
} as const;
