import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const recipientOutputSchema = z.object({
  recipientId: z.number(),
  recipientDisplayName: z.string(),
  currencyCode: z.string(),
  bankCountryCode: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
});
const fieldSchema = z.object({ name: z.string(), value: z.string() });
export const getRecipientsQuerySchema = z.object({
  organizationId: z.string(),
});

export const getRecipientsRouteDef = createRoute({
  method: "get",
  path: "/recipients",
  request: {
    query: getRecipientsQuerySchema,
  },
  responses: {
    200: {
      description: "List of recipients",
      content: {
        "application/json": {
          schema: z.object({
            recipients: z.array(
              z.object({
                recipient: recipientOutputSchema,
                fields: z.array(fieldSchema),
              })
            ),
          }),
        },
      },
    },
  },
  // Handler removed - will be in a separate file
});
