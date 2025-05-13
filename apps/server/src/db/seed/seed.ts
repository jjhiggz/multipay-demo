import { seedHelpers } from "./helpers/seed-helpers";

const { resetDatabase, addUserToOrganization, createOrganization, createUser } =
  seedHelpers;
const main = async () => {
  await resetDatabase();

  // Create users
  const jonAmerica = await createUser({
    email: "jon@achairs.com",
    name: "Jon America Chairs",
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
