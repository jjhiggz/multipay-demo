import { VALID_CURRENCY_CODES } from "@/constants/currency.constants";
import { seedHelpers } from "./helpers/seed-helpers";
import { db } from "..";
import { currency } from "../schema/auth-schema";
import { tag } from "@/utils/promise-handlers";

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
  }).then(tag("created jon@achairs.com"));

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
  }).then(tag("created canada@achairs.com"));

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
  }).then(tag("created india@achairs.com"));

  const americanChairs = await createOrganization({
    name: "AmericanChairs",
    slug: "american-chairs",
  }).then(tag("created american-chairs org"));

  await addUserToOrganization({
    userId: jonAmerica.user.id,
    organizationId: americanChairs.id,
    role: "owner",
  }).then(tag("added jon to american-chairs"));

  await addUserToOrganization({
    userId: canadianUser.user.id,
    organizationId: americanChairs.id,
    role: "member",
  }).then(tag("added canada to american-chairs"));

  await addUserToOrganization({
    userId: indiaUser.user.id,
    organizationId: americanChairs.id,
    role: "member",
  }).then(tag("added india to american-chairs"));

  // Create profiles
  await createProfile({ email: jonAmerica.user.email }, {
    profile:  {
      maxScheduledPaymentDays: 200
    }
  }).then(
    tag("created jon profile")
  );

  await createProfile(
    { email: canadianUser.user.email },
    { profile: { region: "CA" } }
  ).then(tag("created canada profile"));

  await createProfile(
    { email: indiaUser.user.email }, 
    { profile: { region: "IN" } }
  ).then(tag("created india profile"));

  await seedHelpers
    .createRecipientsForOrganization(
      americanChairs.id,
      seedHelpers.getRecipientData({
        allowedCurrencies: ["USD", "CAD", "GBP"],
        count: 300,
      })
    )
    .then(tag("created 300 recipients for american-chairs"));
};

main();
