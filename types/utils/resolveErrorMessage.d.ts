declare function resolveErrorMessage(error: string): string | undefined;
declare function resolveErrorMessage(
  error: Map<string, string>,
  name: string
): string | undefined;
declare function resolveErrorMessage<T, K extends keyof T>(
  error: T,
  name: K
): string | undefined;

export default resolveErrorMessage;
