import { db } from "@/db";
import { recipient } from "@/db/schema/auth-schema";

export type NewRecipient = {
  recipientDisplayName: string;
  currencyCode: string;
  bankCountryCode: string;
  bankName: string;
  accountNumber: string;
};

export async function _createRecipientsForOrganization(
  organizationId: string,
  recipients: NewRecipient[]
) {
  if (!recipients.length) return [];
  const rows = recipients.map((r) => ({
    organizationId,
    recipientDisplayName: r.recipientDisplayName,
    currencyCode: r.currencyCode,
    bankCountryCode: r.bankCountryCode,
    bankName: r.bankName,
    accountNumber: r.accountNumber,
  }));
  // Insert all recipients in one call
  return db.insert(recipient).values(rows).returning();
}
