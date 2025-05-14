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
