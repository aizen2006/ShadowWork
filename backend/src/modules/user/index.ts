import { Elysia } from "elysia";
import { userService } from "./service";
import { UserModel } from "./model";
import { handleRouteError } from "../../utils/httpError";

export const user = new Elysia()
  .post(
    "/user",
    async ({ body, set }) => {
      try {
        const result = await userService.createUser(body.wallet_address);
        if (!result.ok) {
          set.status = 409;
          return { message: result.message };
        }
        set.status = 201;
        return {
          data: {
            anon_id: result.user.anon_id,
            wallet_address: result.user.wallet_address,
            id: result.user.id,
            created_at: result.user.created_at,
          },
          message: "User created successfully",
        };
      } catch (error) {
        return handleRouteError(set, error);
      }
    },
    {
      body: UserModel.walletBody,
    },
  )
  .get(
    "/user",
    async ({ query, set }) => {
      try {
        const row = await userService.getAnonIdByWallet(query.wallet_address);
        if (!row) {
          set.status = 404;
          return { message: "User not found for this wallet address" };
        }
        set.status = 200;
        return {
          data: {
            id: row.id,
            anon_id: row.anon_id,
            wallet_address: row.wallet_address,
            created_at: row.created_at,
          },
          message: "User fetched successfully",
        };
      } catch (error) {
        return handleRouteError(set, error);
      }
    },
    {
      query: UserModel.walletQuery,
    },
  );
