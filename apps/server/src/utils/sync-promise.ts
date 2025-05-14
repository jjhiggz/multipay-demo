export class SyncPromise<T> {
  private value: T | null = null;
  private error: Error | null = null;
  private isResolved = false;
  private isRejected = false;

  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (error: Error) => void
    ) => void
  ) {
    try {
      executor(
        (value) => {
          this.value = value;
          this.isResolved = true;
        },
        (error) => {
          this.error = error;
          this.isRejected = true;
        }
      );
    } catch (error) {
      this.error = error instanceof Error ? error : new Error(String(error));
      this.isRejected = true;
    }
  }

  then<R>(onFulfilled: (value: T) => R): SyncPromise<R> {
    if (this.isRejected) {
      return new SyncPromise<R>((_, reject) => reject(this.error!));
    }
    if (!this.isResolved) {
      throw new Error("Cannot call then() before resolution");
    }
    return new SyncPromise<R>((resolve) => resolve(onFulfilled(this.value!)));
  }

  catch<R>(onRejected: (error: Error) => R): SyncPromise<R> {
    if (this.isResolved) {
      return new SyncPromise<R>((resolve) =>
        resolve(this.value as unknown as R)
      );
    }
    if (!this.isRejected) {
      throw new Error("Cannot call catch() before rejection");
    }
    return new SyncPromise<R>((resolve) => resolve(onRejected(this.error!)));
  }

  unwrap(): T {
    if (this.isRejected) {
      throw this.error;
    }
    if (!this.isResolved) {
      throw new Error("Cannot unwrap before resolution");
    }
    return this.value!;
  }

  static resolve<T>(value: T): SyncPromise<T> {
    return new SyncPromise<T>((resolve) => resolve(value));
  }

  static reject<T>(error: Error): SyncPromise<T> {
    return new SyncPromise<T>((_, reject) => reject(error));
  }
}
