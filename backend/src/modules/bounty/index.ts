import { Elysia } from "elysia";
import { bountyService } from "./service";
import { BountyModel } from "./model";
import { handleRouteError } from "../../utils/httpError";

export const bounty = new Elysia()
  .post(
    "/bounty",
    async ({ body, set }) => {
      try {
        const data = await bountyService.createBounty(
          body.title,
          body.description,
          body.reward,
          body.deadline,
          body.creator_id,
        );
        set.status = 201;
        return {
          data,
          message: "Bounty created successfully",
        };
      } catch (error) {
        return handleRouteError(set, error);
      }
    },
    {
      body: BountyModel.bountyBody,
    },
  )
  .get("/bounties", async ({ set }) => {
    try {
      const data = await bountyService.getBounties();
      set.status = 200;
      return {
        data,
        message: "Bounties fetched successfully",
      };
    } catch (error) {
      return handleRouteError(set, error);
    }
  })
  .get(
    "/bounty/:id",
    async ({ params, set }) => {
      try {
        const id = Number(params.id);
        const data = await bountyService.getBountyById(id);
        if (!data) {
          set.status = 404;
          return {
            message: "Bounty not found",
          };
        }
        set.status = 200;
        return {
          data,
          message: "Bounty fetched successfully",
        };
      } catch (error) {
        return handleRouteError(set, error);
      }
    },
    {
      params: BountyModel.bountyParams,
    },
  );
