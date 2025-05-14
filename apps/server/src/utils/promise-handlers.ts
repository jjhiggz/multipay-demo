import { z } from "zod";

export const tag =
  (message: string) =>
  <T>(input: T) => {
    console.log(message);
    return input;
  };

export const logInfo =
  (message: string) =>
  <T>(input: T) => {
    console.info(`[INFO] ${message}:`, input);
    return input;
  };

export const logError =
  (message: string) =>
  <T>(input: T) => {
    console.error(`[ERROR] ${message}:`, input);
    return input;
  };

export const logDebug =
  (message: string) =>
  <T>(input: T) => {
    console.debug(`[DEBUG] ${message}:`, input);
    return input;
  };

export const logWarn =
  (message: string) =>
  <T>(input: T) => {
    console.warn(`[WARN] ${message}:`, input);
    return input;
  };

export const handleZodFailure = (e: Error) => {
  if (e instanceof z.ZodError) {
    const flattend = JSON.stringify(e.flatten());
    console.error(flattend);
    throw new Error(flattend);
  }
  throw e;
};
