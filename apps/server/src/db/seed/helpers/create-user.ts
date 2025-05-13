import { db } from "@/db";
import { user } from "@/db/schema/auth-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const _createUser = async ({
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
