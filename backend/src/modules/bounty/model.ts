import { t, type UnwrapSchema } from "elysia";

export const BountyModel = {
  bountyBody: t.Object({
    title: t.String(),
    description: t.String(),
    reward: t.Number(),
    deadline: t.String(),
    creator_id: t.Number(),
  }),
  bountyParams: t.Object({
    id: t.Numeric(),
  }),
  bountyResponse: t.Object({
    id: t.Number(),
    title: t.String(),
    description: t.String(),
    reward: t.Number(),
    deadline: t.String(),
    creator_id: t.Number(),
    status: t.Union([t.Literal("open"), t.Literal("closed")]),
  }),
} as const;

export type BountyModel = {
  [k in keyof typeof BountyModel]: UnwrapSchema<(typeof BountyModel)[k]>;
};
