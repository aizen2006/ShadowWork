import { Elysia } from "elysia";
import { winnerService } from "./service";
import { WinnerModel } from "./model";
import { handleRouteError } from "../../utils/httpError";

export const winner = new Elysia().post(
  "/select-winner",
  async ({ body, set }) => {
    try {
      const result = await winnerService.selectWinner(
        body.bounty_id,
        body.creator_id,
        body.submission_id,
      );

      if (!result.ok) {
        set.status = result.status;
        return {
          message: result.message,
        };
      }

      set.status = 200;
      return {
        data: {
          bounty_id: result.bounty_id,
          winner_anon_id: result.winner_anon_id,
          status: "closed" as const,
        },
        message: "Winner selected; bounty closed",
      };
    } catch (error) {
      return handleRouteError(set, error);
    }
  },
  {
    body: WinnerModel.selectWinnerBody,
  },
);
