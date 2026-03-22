import { db } from "../../db/index";
import {
  bountiesTable,
  submissionsTable,
  usersTable,
  winnersTable,
} from "../../db/schema";
import { eq } from "drizzle-orm";

export type SelectWinnerResult =
  | { ok: true; bounty_id: number; winner_anon_id: string }
  | {
      ok: false;
      status: 400 | 403 | 404 | 409;
      message: string;
    };

export abstract class winnerService {
  static async selectWinner(
    bountyId: number,
    creatorId: number,
    submissionId: number,
  ): Promise<SelectWinnerResult> {
    const [bounty] = await db
      .select()
      .from(bountiesTable)
      .where(eq(bountiesTable.id, bountyId));

    if (!bounty) {
      return { ok: false, status: 404, message: "Bounty not found" };
    }

    if (bounty.creator_id !== creatorId) {
      return {
        ok: false,
        status: 403,
        message: "Only the bounty creator can select a winner",
      };
    }

    if (bounty.status === "closed") {
      return {
        ok: false,
        status: 409,
        message: "Bounty is already closed",
      };
    }

    const [submission] = await db
      .select()
      .from(submissionsTable)
      .where(eq(submissionsTable.id, submissionId));

    if (!submission) {
      return { ok: false, status: 404, message: "Submission not found" };
    }

    if (submission.bounty_id !== bountyId) {
      return {
        ok: false,
        status: 400,
        message: "Submission does not belong to this bounty",
      };
    }

    const [winnerUser] = await db
      .select({ anon_id: usersTable.anon_id })
      .from(usersTable)
      .where(eq(usersTable.id, submission.submitter_id));

    if (!winnerUser) {
      return {
        ok: false,
        status: 404,
        message: "Submitter user not found",
      };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(bountiesTable)
        .set({ status: "closed" })
        .where(eq(bountiesTable.id, bountyId));

      await tx
        .insert(winnersTable)
        .values({
          bounty_id: bountyId,
          winner_anon_id: winnerUser.anon_id,
        })
        .onConflictDoUpdate({
          target: winnersTable.bounty_id,
          set: { winner_anon_id: winnerUser.anon_id },
        });
    });

    return {
      ok: true,
      bounty_id: bountyId,
      winner_anon_id: winnerUser.anon_id,
    };
  }
}
