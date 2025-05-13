import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { auth } from "../lib/auth";
import { z } from "zod";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  getCurrentUser: publicProcedure.handler(({ context }) => {
    return context.session?.user ?? null;
  }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .handler(async ({ input }) => {
      console.log("hithithit");
      // Call Better Auth's sign-in API
      return await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
      });
    }),
};
export type AppRouter = typeof appRouter;
