import { SubmissionModel } from "./model";
import { db } from "../../db/index";
import { submissionsTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export abstract class submisionService {
    static async createSubmission(bounty_id: number, submitter_id: number, content: string): Promise<SubmissionModel["submissionResponse"]> {
        const created_at = new Date().toISOString();
        const newSubmission = await db.insert(submissionsTable).values({bounty_id, submitter_id, content, created_at}).returning();
        return {
            id: newSubmission[0].id,
            bounty_id,
            submitter_id,
            content,
        };
    }

    static async getSubmissions(bountyId: number): Promise<SubmissionModel["submissionResponse"][]> {
        const submissions = await db.select().from(submissionsTable).where(eq(submissionsTable.bounty_id, bountyId));
        return submissions;
    }
}