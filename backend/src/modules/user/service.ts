import generateUniqueString from "../../utils/generateUniqueId";
import { db } from "../../db/index";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import type { UserModel } from "./model";

const ANON_ID_LENGTH = 24;

export type CreateUserResult =
  | { ok: true; user: UserModel["userResponse"] }
  | { ok: false; code: "CONFLICT"; message: string };

export abstract class userService {
  static async createUser(
    wallet_address: string,
  ): Promise<CreateUserResult> {
    const [existing] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.wallet_address, wallet_address));

    if (existing) {
      return {
        ok: false,
        code: "CONFLICT",
        message: "User already exists for this wallet address",
      };
    }

    const created_at = new Date().toISOString();
    const anon_id = generateUniqueString(ANON_ID_LENGTH);

    const [row] = await db
      .insert(usersTable)
      .values({
        wallet_address,
        anon_id,
        created_at,
      })
      .returning();

    return {
      ok: true,
      user: {
        id: row.id,
        wallet_address: row.wallet_address,
        anon_id: row.anon_id,
        created_at: row.created_at,
      },
    };
  }

  static async getAnonIdByWallet(
    wallet_address: string,
  ): Promise<UserModel["userResponse"] | null> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.wallet_address, wallet_address));
    return row ?? null;
  }
}
