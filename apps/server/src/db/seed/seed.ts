import { VALID_CURRENCY_CODES } from "@/constants/currency.constants";
import { seedHelpers } from "./helpers/seed-helpers";
import { db } from "..";
import { currency } from "../schema/auth-schema";

const {
  resetDatabase,
  addUserToOrganization,
  createOrganization,
  createUser,
  createProfile,
} = seedHelpers;
const main = async () => {
  await resetDatabase();
  // Insert all currencies from VALID_CURRENCY_CODES
  await db
    .insert(currency)
    .values(
      VALID_CURRENCY_CODES.map(({ code, name }) => ({
        isoCode: code,
        name: name,
      }))
    )
    .onConflictDoNothing();

  // Create users
  const jonAmerica = await createUser({
    email: "jon@achairs.com",
    name: "Jon America Chairs",
    password: "password123",
    currencies: [
      ["USD", {}],
      ["CAD", {}],
      ["EUR", {}],
      ["GBP", {}],
      ["JPY", {}],
      ["AUD", {}],
      ["CHF", {}],
      ["CNY", {}],
      ["INR", {}],
      ["BRL", {}],
      ["MXN", {}],
      ["SGD", {}],
    ],
  });

  const canadianUser = await createUser({
    email: "canada@achairs.com",
    name: "Canada Chairs",
    password: "password123",
    currencies: [
      [
        "CAD",
        {
          amountPrecision: 2,
          canBuy: true,
          canSell: true,
          sameCurrencySupported: true,
          marketOrderEnabled: true,
        },
      ],
      [
        "USD",
        {
          amountPrecision: 2,
          canBuy: false,
          canSell: true,
          sameCurrencySupported: false,
          marketOrderEnabled: false,
        },
      ],
    ],
  });

  const indiaUser = await createUser({
    email: "india@achairs.com",
    name: "India Chairs",
    password: "password123",
    currencies: [
      [
        "INR",
        {
          amountPrecision: 2,
          canBuy: true,
          canSell: true,
          sameCurrencySupported: true,
          marketOrderEnabled: true,
        },
      ],
      [
        "USD",
        {
          amountPrecision: 2,
          canBuy: true,
          canSell: false,
          sameCurrencySupported: false,
          marketOrderEnabled: false,
        },
      ],
    ],
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
  await addUserToOrganization({
    userId: canadianUser.user.id,
    organizationId: americanChairs.id,
    role: "member",
  });
  await addUserToOrganization({
    userId: indiaUser.user.id,
    organizationId: americanChairs.id,
    role: "member",
  });

  // Create a profile for jon@achairs.com
  await createProfile({ email: jonAmerica.user.email }, {});
  // Create a profile for canada@achairs.com
  await createProfile({ email: canadianUser.user.email }, { region: "CA" });
  // Create a profile for india@achairs.com
  await createProfile({ email: indiaUser.user.email }, { region: "IN" });

  await seedHelpers.createRecipientsForOrganization(
    americanChairs.id,
    seedHelpers.getRecipientData({
      allowedCurrencies: ["USD", "CAD", "GBP"],
      count: 300,
    })
  );
};

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
