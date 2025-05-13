import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  user,
  session,
  account,
  verification,
  organization,
  member,
  invitation,
  recipient,
} from "./auth-schema";

// User schemas
export const s = {
  user: {
    insert: createInsertSchema(user),
    select: createSelectSchema(user),
    refined: createInsertSchema(user, {
      email: (schema) => schema.email(),
      name: (schema) => schema.min(1),
    }),
  },
  session: {
    insert: createInsertSchema(session),
    select: createSelectSchema(session),
  },
  account: {
    insert: createInsertSchema(account),
    select: createSelectSchema(account),
  },
  verification: {
    insert: createInsertSchema(verification),
    select: createSelectSchema(verification),
  },
  organization: {
    insert: createInsertSchema(organization),
    select: createSelectSchema(organization),
  },
  member: {
    insert: createInsertSchema(member),
    select: createSelectSchema(member),
  },
  invitation: {
    insert: createInsertSchema(invitation),
    select: createSelectSchema(invitation),
  },
  recipient: {
    insert: createInsertSchema(recipient),
    select: createSelectSchema(recipient),
    refined: createInsertSchema(recipient, {
      recipientDisplayName: (schema) => schema.min(1),
      currencyCode: (schema) => schema.length(3),
      bankCountryCode: (schema) => schema.length(2),
      accountNumber: (schema) => schema.min(1),
    }),
  },
} as const;
