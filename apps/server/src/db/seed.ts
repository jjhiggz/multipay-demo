import { auth } from "../lib/auth";
import { db } from "./index";
import {
  user,
  account,
  session,
  verification,
  organization,
  invitation,
  member,
} from "./schema/auth-schema";
import { eq } from "drizzle-orm";

const resetDatabase = async () => {
  await db.delete(session);
  await db.delete(member);
  await db.delete(organization);
  await db.delete(invitation);
  await db.delete(account);
  await db.delete(verification);
  await db.delete(user);
  console.log("Database reset complete");
};

const createUser = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  return auth.api
    .signUpEmail({
      body: {
        email,
        name,
        password,
      },
    })
    .then(async (userData) => {
      await db
        .update(user)
        .set({ emailVerified: true })
        .where(eq(user.id, userData.user.id));
      return userData;
    })
    .catch((error) => {
      console.error("Failed to create user:", {
        email,
        name,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    });
};

export async function createOrganization({
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

export async function addUserToOrganization({
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

const main = async () => {
  await resetDatabase();

  // Create users
  const jonAmerica = await createUser({
    email: "jon@achairs.com",
    name: "Jon America Chairs",
    password: "password123",
  });
  const saraAmerica = await createUser({
    email: "sara@achairs.com",
    name: "Sara A. Chairs",
    password: "password123",
  });
  const mikeAmerica = await createUser({
    email: "mike@achairs.com",
    name: "Mike A. Chairs",
    password: "password123",
  });
  const aliBeds = await createUser({
    email: "ali@ibeds.com",
    name: "Ali I. Beds",
    password: "password123",
  });
  const rajBeds = await createUser({
    email: "raj@ibeds.com",
    name: "Raj I. Beds",
    password: "password123",
  });

  const americanChairs = await createOrganization({
    name: "AmericanChairs",
    slug: "american-chairs",
  });

  await addUserToOrganization({
    userId: jonAmerica.user.id,
    organizationId: americanChairs.id,
    role: "owner",
  });
};

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
