import { db } from "@/db";
import {
  account,
  invitation,
  member,
  organization,
  recipient,
  session,
  user,
  verification,
} from "@/db/schema/auth-schema";

export const _resetDatabase = async () => {
  await db.delete(recipient);
  await db.delete(session);
  await db.delete(member);
  await db.delete(organization);
  await db.delete(invitation);
  await db.delete(account);
  await db.delete(verification);
  await db.delete(user);
  console.log("Database reset complete");
};
