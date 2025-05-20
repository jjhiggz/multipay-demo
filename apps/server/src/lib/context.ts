import type { Context as HonoContext } from "hono";
import { auth } from "./auth";
import { ORPCError, os } from "@orpc/server";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  return {
    session,
  };
}

export const userExistsMiddleware = os
  .$context<Context>()
  .middleware(async ({ context, next }) => {
    if (!context.session?.user) {
      throw new ORPCError("UNAUTHORIZED");
    }
    return next({
      context: {
        ...context,
        session: context.session,
      },
    });
  });

export type Context = Awaited<ReturnType<typeof createContext>>;
