import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth-schema";
import { eq } from "drizzle-orm";
import { member } from "../db/schema/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getActiveOrganization(session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: organization.id,
            },
          };
        },
      },
    },
  },
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [organization({})],
});

export async function getActiveOrganization(userId: string) {
  // Find the first organization the user is a member of, ordered by createdAt
  const orgs = await db
    .select({
      id: schema.organization.id,
      name: schema.organization.name,
      slug: schema.organization.slug,
      logo: schema.organization.logo,
      createdAt: schema.organization.createdAt,
      metadata: schema.organization.metadata,
    })
    .from(member)
    .innerJoin(
      schema.organization,
      eq(member.organizationId, schema.organization.id)
    )
    .where(eq(member.userId, userId))
    .orderBy(schema.organization.createdAt)
    .limit(1);
  return orgs[0] || null;
}
