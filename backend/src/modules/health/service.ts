import { pool } from "../../db/index";

export abstract class healthService {
  static async checkDatabase(): Promise<
    { ok: true } | { ok: false; error: string }
  > {
    try {
      await pool.query("SELECT 1");
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
