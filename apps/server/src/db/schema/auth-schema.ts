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

// --- Main Profile Table (flattened) ---
export const profile = sqliteTable("profile", {
  profileId: integer("profile_id").primaryKey(),
  userEmail: text("user_email")
    .notNull()
    .references(() => user.email),
  onlineCredentialId: integer("online_credential_id").notNull(),
  clientId: integer("client_id").notNull(),
  clientNumber: text("client_number").notNull(),
  accountType: text("account_type").notNull(),
  accountStatus: text("account_status").notNull(),
  accountKycStatus: text("account_kyc_status").notNull(),
  accountRestricted: integer("account_restricted", {
    mode: "boolean",
  }).notNull(),
  businessUnitId: integer("business_unit_id").notNull(),
  region: text("region").notNull(),
  brandRegionId: integer("brand_region_id").notNull(),
  trmBusinessUnitId: integer("trm_business_unit_id").notNull(),
  fullNameFirstName: text("full_name_first_name").notNull(),
  fullNameLastName: text("full_name_last_name").notNull(),
  accountName: text("account_name").notNull(),
  freeFormatAddressLine1: text("free_format_address_line1").notNull(),
  freeFormatAddressPlace: text("free_format_address_place").notNull(),
  freeFormatAddressCounty: text("free_format_address_county").notNull(),
  freeFormatAddressPostalCode: text(
    "free_format_address_postal_code"
  ).notNull(),
  addressLastModified: text("address_last_modified").notNull(),
  country: text("country").notNull(),
  email: text("email").notNull(),
  emailLastModified: text("email_last_modified").notNull(),
  mobileNumberPrefix: text("mobile_number_prefix").notNull(),
  mobileNumberPhone: text("mobile_number_phone").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  termsAndConditionsAcceptedDate: text(
    "terms_and_conditions_accepted_date"
  ).notNull(),
  termsAndConditionsIsValid: integer("terms_and_conditions_is_valid", {
    mode: "boolean",
  }).notNull(),
  preferredLanguage: text("preferred_language").notNull(),
  kycRefreshDueDate: text("kyc_refresh_due_date").notNull(),
  kycRefreshStatus: text("kyc_refresh_status").notNull(),
  createdDate: text("created_date").notNull(),
  platform: text("platform").notNull(),
  documentStatus: text("document_status").notNull(),
  featuresRpaEnabled: integer("features_rpa_enabled", {
    mode: "boolean",
  }).notNull(),
  featuresViewBalance: integer("features_view_balance", {
    mode: "boolean",
  }).notNull(),
  featuresUseBalance: integer("features_use_balance", {
    mode: "boolean",
  }).notNull(),
  featuresMarketOrder: integer("features_market_order", {
    mode: "boolean",
  }).notNull(),
  featuresQuickTransactionsEnabled: integer(
    "features_quick_transactions_enabled",
    { mode: "boolean" }
  ).notNull(),
  sameCurrencySupported: integer("same_currency_supported", {
    mode: "boolean",
  }).notNull(),
  canProvideRecipientLater: integer("can_provide_recipient_later", {
    mode: "boolean",
  }).notNull(),
  balancesEnabled: integer("balances_enabled", { mode: "boolean" }).notNull(),
  transactionViewEnabled: integer("transaction_view_enabled", {
    mode: "boolean",
  }).notNull(),
  canSetupInputterAuthoriserUserRoles: integer(
    "can_setup_inputter_authoriser_user_roles",
    { mode: "boolean" }
  ).notNull(),
  userRoleName: text("user_role_name").notNull(),
  userRolePrivileges: text("user_role_privileges").notNull(), // store as comma-separated or JSON string
  expectedTradeCurrency: text("expected_trade_currency").notNull(),
  expectedPayoutCurrency: text("expected_payout_currency").notNull(),
  expectedAnnualTradingVolume: integer(
    "expected_annual_trading_volume"
  ).notNull(),
  regionalAccountingCurrency: text("regional_accounting_currency").notNull(),
  expectedVolumeInRegionalAccountingCurrency: integer(
    "expected_volume_in_regional_accounting_currency"
  ).notNull(),
  expectedFrequency: text("expected_frequency").notNull(),
  onlineDirectDebitEnabled: integer("online_direct_debit_enabled", {
    mode: "boolean",
  }).notNull(),
  canUseOnlineDealing: integer("can_use_online_dealing", {
    mode: "boolean",
  }).notNull(),
  unitcode: text("unitcode").notNull(),
  brandId: integer("brand_id").notNull(),
  lastTradedDate: text("last_traded_date").notNull(),
  maxScheduledPaymentDays: integer("max_scheduled_payment_days").notNull(),
  onlineCredentialStatus: text("online_credential_status").notNull(),
  modifyRolesEnabled: integer("modify_roles_enabled", {
    mode: "boolean",
  }).notNull(),
});
