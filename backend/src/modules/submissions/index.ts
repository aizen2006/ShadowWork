import { Elysia } from "elysia";
import { submisionService } from "./service";
import { SubmissionModel } from "./model";
import { handleRouteError } from "../../utils/httpError";

export const submissions = new Elysia()
  .post(
    "/submissions",
    async ({ body, set }) => {
      try {
        const submission = await submisionService.createSubmission(
          body.bounty_id,
          body.submitter_id,
          body.content,
        );
        set.status = 201;
        return {
          data: submission,
          message: "Submission created successfully",
        };
      } catch (error) {
        return handleRouteError(set, error);
      }
    },
    {
      body: SubmissionModel.submissionBody,
    },
  )
  .get(
    "/bounty/:id/submissions",
    async ({ params, set }) => {
      try {
        const list = await submisionService.getSubmissions(Number(params.id));
        if (list.length === 0) {
          set.status = 404;
          return {
            message: "No submissions found",
          };
        }
        set.status = 200;
        return {
          data: list,
          message: "Submissions fetched successfully",
        };
      } catch (error) {
        return handleRouteError(set, error);
      }
    },
    {
      params: SubmissionModel.submissionParams,
    },
  );
