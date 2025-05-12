import { db } from "./index";
import { user, account } from "./schema/auth";
import bcrypt from "bcryptjs";

async function createUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  const now = new Date();
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();
  await db.insert(user).values({
    id: userId,
    name,
    email,
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  } as any);
  await db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: email,
    providerId: "email",
    userId,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  } as any);
  return { id: userId, email, name };
}

async function main() {
  const user1 = await createUser({
    email: "user1@example.com",
    name: "User One",
    password: "password123",
  });
  const user2 = await createUser({
    email: "user2@example.com",
    name: "User Two",
    password: "password456",
  });
  console.log("Seeded users:", { user1, user2 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
