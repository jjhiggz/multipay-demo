import { eq } from "drizzle-orm";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import { db } from "./index";
import {
  user,
  account,
  session,
  verification,
  transaction,
  organization,
  member,
} from "./schema/auth";

const resetDatabase = async () => {
  await db.delete(transaction);
  await db.delete(session);
  await db.delete(member);
  await db.delete(organization);
  await db.delete(account);
  await db.delete(verification);
  await db.delete(user);
  console.log("Database reset complete");
};

const createUserAndLinkToOrg = async ({
  email,
  name,
  password,
  orgId,
  role = "member",
  orgName,
}: {
  email: string;
  name: string;
  password: string;
  orgId: string;
  role?: "member" | "admin";
  orgName: string;
}) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });
    console.log(`Created user: ${name} (${email})`);
  } catch (error: any) {
    console.error(`Failed to create user ${email}: ${error.message}`);
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email));
    if (existingUser.length > 0) {
      console.log(`User ${email} already exists, proceeding with linking...`);
    } else {
      throw error; // Re-throw if it's not an "already exists" type of error or if creation genuinely failed
    }
  }

  const [createdUser] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email));

  if (createdUser) {
    const memberId = crypto.randomUUID();
    await db.insert(member).values({
      id: memberId,
      userId: createdUser.id,
      organizationId: orgId,
      role: role,
      createdAt: new Date(),
    });
    console.log(`Added ${name} (${email}) to ${orgName} org as ${role}`);
  } else {
    console.error(
      `Could not find user ${email} after creation/check to link to org.`
    );
  }
};

const main = async () => {
  await resetDatabase();

  console.log("Seeding organizations...");
  const americaOrgId = crypto.randomUUID();
  await db.insert(organization).values({
    id: americaOrgId,
    name: "America",
    slug: "america",
    createdAt: new Date(),
  });
  console.log(`Created organization: America (ID: ${americaOrgId})`);

  const indiaOrgId = crypto.randomUUID();
  await db.insert(organization).values({
    id: indiaOrgId,
    name: "India",
    slug: "india",
    createdAt: new Date(),
  });
  console.log(`Created organization: India (ID: ${indiaOrgId})`);

  const canadaOrgId = crypto.randomUUID();
  await db.insert(organization).values({
    id: canadaOrgId,
    name: "Canada",
    slug: "canada",
    createdAt: new Date(),
  });
  console.log(`Created organization: Canada (ID: ${canadaOrgId})`);

  console.log("\nSeeding users and members...");

  // America Users
  await createUserAndLinkToOrg({
    email: "jon@america.com",
    name: "Jon America",
    password: "password123",
    orgId: americaOrgId,
    orgName: "America",
  });
  await createUserAndLinkToOrg({
    email: "james@america.com",
    name: "James America",
    password: "password123",
    orgId: americaOrgId,
    orgName: "America",
  });
  await createUserAndLinkToOrg({
    email: "stephen@america.com",
    name: "Stephen America",
    password: "password123",
    orgId: americaOrgId,
    orgName: "America",
  });

  // India Users
  await createUserAndLinkToOrg({
    email: "jon@india.com",
    name: "Jon India",
    password: "password123",
    orgId: indiaOrgId,
    orgName: "India",
  });
  await createUserAndLinkToOrg({
    email: "james@india.com",
    name: "James India",
    password: "password123",
    orgId: indiaOrgId,
    orgName: "India",
  });
  await createUserAndLinkToOrg({
    email: "stephen@india.com",
    name: "Stephen India",
    password: "password123",
    orgId: indiaOrgId,
    orgName: "India",
  });

  // Canada Users
  await createUserAndLinkToOrg({
    email: "jon@canada.com",
    name: "Jon Canada",
    password: "password123",
    orgId: canadaOrgId,
    orgName: "Canada",
  });
  await createUserAndLinkToOrg({
    email: "james@canada.com",
    name: "James Canada",
    password: "password123",
    orgId: canadaOrgId,
    orgName: "Canada",
  });
  await createUserAndLinkToOrg({
    email: "stephen@canada.com",
    name: "Stephen Canada",
    password: "password123",
    orgId: canadaOrgId,
    orgName: "Canada",
  });

  console.log("\nSetting up special admin user...");
  await createUserAndLinkToOrg({
    email: "jon.admin@india.com",
    name: "Jon Admin India",
    password: "password123",
    orgId: indiaOrgId,
    role: "admin",
    orgName: "India",
  });

  console.log("\nSeeding complete.");
};

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
