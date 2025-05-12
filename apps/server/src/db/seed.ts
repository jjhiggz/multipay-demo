import { auth } from "@/lib/auth";
import { db } from "./index";
import {
  user,
  account,
  session,
  verification,
  transaction,
} from "./schema/auth";

const resetDatabase = async () => {
  await db.delete(transaction);
  await db.delete(session);
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
  await auth.api.signUpEmail({
    body: {
      email,
      name,
      password,
    },
  });
  return {
    email,
    name,
    password,
  };
};

const main = async () => {
  await resetDatabase();
  const user1 = await createUser({
    email: "jon@jon.com",
    name: "User One",
    password: "password123",
  });
  const user2 = await createUser({
    email: "user2@example.com",
    name: "User Two",
    password: "password456",
  });
  console.log("Seeded users:", { user1, user2 });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
