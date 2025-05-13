import { db } from "@/db";
import { member } from "@/db/schema/auth-schema";

export async function _addUserToOrganization({
  userId,
  organizationId,
  role,
}: {
  userId: string;
  organizationId: string;
  role: string; // "owner" | "admin" | "member"
}) {
  const now = new Date();
  return db.insert(member).values({
    id: crypto.randomUUID(),
    userId,
    organizationId,
    role,
    createdAt: now,
  });
}
