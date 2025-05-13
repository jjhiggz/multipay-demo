import "dotenv/config";
import { RPCHandler } from "@orpc/server/fetch";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { db } from "./db";
import { organization } from "./db/schema/auth-schema";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: process.env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/**", async (c) => {
  const orgs = await auth.api.listOrganizations().catch(() => null);
  console.log({
    orgs,
  });
  return auth.handler(c.req.raw);
});

const handler = new RPCHandler(appRouter);
app.use("/rpc/*", async (c, next) => {
  const context = await createContext({ context: c });
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: context,
  });
  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
