import { Elysia } from "elysia";
import { healthService } from "./service";
import { handleRouteError } from "../../utils/httpError";

export const health = new Elysia({ prefix: "/health" })
  .get("/", ({ set }) => {
    set.status = 200;
    return {
      status: "ok" as const,
      timestamp: new Date().toISOString(),
    };
  })
  .get("/db", async ({ set }) => {
    try {
      const result = await healthService.checkDatabase();
      if (!result.ok) {
        set.status = 503;
        return {
          status: "error" as const,
          database: "down" as const,
          message: result.error,
        };
      }
      set.status = 200;
      return {
        status: "ok" as const,
        database: "up" as const,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleRouteError(set, error);
    }
  });
