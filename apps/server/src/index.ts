import "dotenv/config";
import { createContext } from "./lib/context";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { newAppRouter } from "./routers";
import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import { RPCHandler } from "@orpc/server/fetch";

const lag = 200;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const app = new Hono();

app.use(logger());

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});
const openAPIHandler = new OpenAPIHandler(newAppRouter, {
  plugins: [new CORSPlugin()],
});
const rpcHandler = new RPCHandler(newAppRouter);

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
  return auth.handler(c.req.raw);
});

// const handler = new RPCHandler(appRouter);
app.use("*", async (c, next) => {
  await wait(lag);
  const context = await createContext({ context: c });

  if (c.req.path.includes("/api")) {
    const { matched, response } = await openAPIHandler.handle(c.req.raw, {
      prefix: "/api",
      context,
    });
    if (matched) {
      return c.newResponse(response.body, response);
    }
    if (c.req.path === "/api/spec.json") {
      const spec = await openAPIGenerator.generate(newAppRouter, {
        info: {
          title: "My Playground",
          version: "1.0.0",
        },
        servers: [
          { url: "/api" } /** Should use absolute URLs in production */,
        ],
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
      });

      return c.json(spec);
    }
    if (c.req.path === "/api/docs") {
      const html = `
    <!doctype html>
    <html>
      <head>
        <title>My Client</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="https://orpc.unnoq.com/icon.svg" />
      </head>
      <body>
        <div id="app"></div>

        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        <script>
          Scalar.createApiReference('#app', {
            url: '/api/spec.json',
            authentication: {
              securitySchemes: {
                bearerAuth: {
                  token: 'default-token',
                },
              },
            },
          })
        </script>
      </body>
    </html>
  `;
      return c.html(html);
    }
  }
  if (c.req.path.includes("/rpc")) {
    const { matched, response } = await rpcHandler.handle(c.req.raw, {
      prefix: "/rpc",
      context,
    });
    if (matched) {
      return c.newResponse(response.body, response);
    }
  }
  await next();
});

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
