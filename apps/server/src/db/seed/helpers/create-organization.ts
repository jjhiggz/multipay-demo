import { db } from "@/db";
import { organization } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export async function _createOrganization({
  name,
  slug,
  logo,
  metadata,
}: {
  name: string;
  slug: string;
  logo?: string;
  metadata?: string;
}) {
  // Check if org already exists
  const existing = await db
    .select()
    .from(organization)
    .where(eq(organization.slug, slug));
  if (existing.length > 0) return existing[0];

  const now = new Date();
  const [org] = await db
    .insert(organization)
    .values({
      id: crypto.randomUUID(),
      name,
      slug,
      logo,
      metadata,
      createdAt: now,
    })
    .returning();
  return org;
}
