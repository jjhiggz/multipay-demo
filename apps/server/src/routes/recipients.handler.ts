import { Hono } from "hono";
import { zValidator } from "@hono/zod-openapi";
import { db } from "../db";
import { recipient } from "../db/schema/auth-schema";
import { eq } from "drizzle-orm";
import {
  getRecipientsRouteDef,
  getRecipientsQuerySchema,
} from "./recipients.route";
import type { Context } from "hono";

const app = new Hono();

app.get(
  getRecipientsRouteDef.path,
  zValidator("query", getRecipientsQuerySchema),
  async (c: Context) => {
    const { organizationId } = c.req.valid("query");
    const rows = await db
      .select()
      .from(recipient)
      .where(eq(recipient.organizationId, organizationId));
    return c.json({
      recipients: rows.map((r) => ({
        recipient: {
          recipientId: r.recipientId,
          recipientDisplayName: r.recipientDisplayName,
          currencyCode: r.currencyCode,
          bankCountryCode: r.bankCountryCode,
          bankName: r.bankName,
          accountNumber: r.accountNumber,
        },
        fields: [
          { name: "recipientId", value: String(r.recipientId) },
          { name: "recipientDisplayName", value: r.recipientDisplayName },
          { name: "currencyCode", value: r.currencyCode },
          { name: "bankCountryCode", value: r.bankCountryCode },
          { name: "bankName", value: r.bankName },
          { name: "accountNumber", value: r.accountNumber },
        ],
      })),
    });
  }
);

export const recipientsHandler = app;
