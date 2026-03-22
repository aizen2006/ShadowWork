import { t, type UnwrapSchema } from "elysia";

export const WinnerModel = {
  selectWinnerBody: t.Object({
    bounty_id: t.Number(),
    creator_id: t.Number(),
    submission_id: t.Number(),
  }),
  selectWinnerResponse: t.Object({
    bounty_id: t.Number(),
    winner_anon_id: t.String(),
    status: t.Literal("closed"),
  }),
} as const;

export type WinnerModel = {
  [k in keyof typeof WinnerModel]: UnwrapSchema<(typeof WinnerModel)[k]>;
};
