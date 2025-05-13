import { db } from "@/db";
import { recipient } from "@/db/schema/auth-schema";
import type { s } from "@/zod-schemas";
import type { z } from "zod";

export async function _createRecipientsForOrganization(
  organizationId: string,
  recipients: Omit<
    z.infer<(typeof s)["recipient"]["insert"]>,
    "organizationId"
  >[]
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
