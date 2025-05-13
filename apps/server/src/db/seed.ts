import { auth } from "../lib/auth";
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
    .then((userData) => userData)
    .catch((error) => {
      console.error("Failed to create user:", {
        email,
        name,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    });
};

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

  console.log("\nSeeding complete.");
};

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
