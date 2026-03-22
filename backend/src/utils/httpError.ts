const isDev = process.env.NODE_ENV !== "production";

type ResponseSetter = { status?: number | string };

/**
 * Logs the error, sets HTTP 500, returns a safe JSON body.
 * In non-production, includes `detail` for debugging.
 */
export function handleRouteError(set: ResponseSetter, error: unknown) {
  console.error(error);
  set.status = 500;
  return {
    message: "Internal server error",
    ...(isDev && {
      detail: error instanceof Error ? error.message : String(error),
    }),
  };
}
