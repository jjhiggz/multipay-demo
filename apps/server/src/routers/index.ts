import { protectedProcedure, publicProcedure } from "../lib/orpc";

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
};
export type AppRouter = typeof appRouter;
