import { t, type UnwrapSchema } from "elysia";

export const UserModel = {
  walletBody: t.Object({
    wallet_address: t.String({ minLength: 1 }),
  }),
  walletQuery: t.Object({
    wallet_address: t.String({ minLength: 1 }),
  }),
  userResponse: t.Object({
    id: t.Number(),
    wallet_address: t.String(),
    anon_id: t.String(),
    created_at: t.String(),
  }),
} as const;

export type UserModel = {
  [k in keyof typeof UserModel]: UnwrapSchema<(typeof UserModel)[k]>;
};
