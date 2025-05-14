import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  activeOrganizationId: text("active_organization_id"),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const organization = sqliteTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  metadata: text("metadata"),
});

export const member = sqliteTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const invitation = sqliteTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const recipient = sqliteTable("recipient", {
  recipientId: integer("recipient_id").primaryKey({ autoIncrement: true }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  recipientDisplayName: text("recipient_display_name").notNull(),
  currencyCode: text("currency_code").notNull(),
  bankCountryCode: text("bank_country_code").notNull(),
  bankName: text("bank_name").notNull(),
  accountNumber: text("account_number").notNull(),
});

// --- Nested Object Tables ---
export const fullName = sqliteTable("full_name", {
  fullNameId: integer("full_name_id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
});

export const freeFormatAddress = sqliteTable("free_format_address", {
  freeFormatAddressId: integer("free_format_address_id").primaryKey(),
  addressLine1: text("address_line1"),
  place: text("place"),
  county: text("county"),
  postalCode: text("postal_code"),
});

export const mobileNumber = sqliteTable("mobile_number", {
  mobileNumberId: integer("mobile_number_id").primaryKey(),
  mobilePrefix: text("mobile_prefix"),
  mobilePhone: text("mobile_phone"),
});

export const termsAndConditions = sqliteTable("terms_and_conditions", {
  termsAndConditionsId: integer("terms_and_conditions_id").primaryKey(),
  acceptedDate: text("accepted_date"),
  isValid: integer("is_valid", { mode: "boolean" }),
});

export const features = sqliteTable("features", {
  featuresId: integer("features_id").primaryKey(),
  rpaEnabled: integer("rpa_enabled", { mode: "boolean" }),
  viewBalance: integer("view_balance", { mode: "boolean" }),
  useBalance: integer("use_balance", { mode: "boolean" }),
  marketOrder: integer("market_order", { mode: "boolean" }),
  quickTransactionsEnabled: integer("quick_transactions_enabled", {
    mode: "boolean",
  }),
});

export const userRole = sqliteTable("user_role", {
  userRoleId: integer("user_role_id").primaryKey(),
  name: text("name"),
});

export const userRolePrivilege = sqliteTable("user_role_privilege", {
  userRolePrivilegeId: integer("user_role_privilege_id").primaryKey(),
  userRoleId: integer("user_role_id").references(() => userRole.userRoleId),
  privilege: text("privilege"),
});

// --- Main Profile Table ---
export const profile = sqliteTable("profile", {
  profileId: integer("profile_id").primaryKey(),
  onlineCredentialId: integer("online_credential_id"),
  clientId: integer("client_id"),
  clientNumber: text("client_number"),
  accountType: text("account_type"),
  accountStatus: text("account_status"),
  accountKycStatus: text("account_kyc_status"),
  accountRestricted: integer("account_restricted", { mode: "boolean" }),
  businessUnitId: integer("business_unit_id"),
  region: text("region"),
  brandRegionId: integer("brand_region_id"),
  trmBusinessUnitId: integer("trm_business_unit_id"),
  accountName: text("account_name"),
  addressLastModified: text("address_last_modified"),
  country: text("country"),
  email: text("email"),
  emailLastModified: text("email_last_modified"),
  dateOfBirth: text("date_of_birth"),
  preferredLanguage: text("preferred_language"),
  kycRefreshDueDate: text("kyc_refresh_due_date"),
  kycRefreshStatus: text("kyc_refresh_status"),
  createdDate: text("created_date"),
  platform: text("platform"),
  documentStatus: text("document_status"),
  sameCurrencySupported: integer("same_currency_supported", {
    mode: "boolean",
  }),
  canProvideRecipientLater: integer("can_provide_recipient_later", {
    mode: "boolean",
  }),
  balancesEnabled: integer("balances_enabled", { mode: "boolean" }),
  transactionViewEnabled: integer("transaction_view_enabled", {
    mode: "boolean",
  }),
  canSetupInputterAuthoriserUserRoles: integer(
    "can_setup_inputter_authoriser_user_roles",
    { mode: "boolean" }
  ),
  expectedTradeCurrency: text("expected_trade_currency"),
  expectedPayoutCurrency: text("expected_payout_currency"),
  expectedAnnualTradingVolume: integer("expected_annual_trading_volume"),
  regionalAccountingCurrency: text("regional_accounting_currency"),
  expectedVolumeInRegionalAccountingCurrency: integer(
    "expected_volume_in_regional_accounting_currency"
  ),
  expectedFrequency: text("expected_frequency"),
  onlineDirectDebitEnabled: integer("online_direct_debit_enabled", {
    mode: "boolean",
  }),
  canUseOnlineDealing: integer("can_use_online_dealing", { mode: "boolean" }),
  unitcode: text("unitcode"),
  brandId: integer("brand_id"),
  lastTradedDate: text("last_traded_date"),
  maxScheduledPaymentDays: integer("max_scheduled_payment_days"),
  onlineCredentialStatus: text("online_credential_status"),
  modifyRolesEnabled: integer("modify_roles_enabled", { mode: "boolean" }),
  // Foreign keys for nested objects
  fullNameId: integer("full_name_id").references(() => fullName.fullNameId),
  freeFormatAddressId: integer("free_format_address_id").references(
    () => freeFormatAddress.freeFormatAddressId
  ),
  mobileNumberId: integer("mobile_number_id").references(
    () => mobileNumber.mobileNumberId
  ),
  termsAndConditionsId: integer("terms_and_conditions_id").references(
    () => termsAndConditions.termsAndConditionsId
  ),
  featuresId: integer("features_id").references(() => features.featuresId),
  userRoleId: integer("user_role_id").references(() => userRole.userRoleId),
});
