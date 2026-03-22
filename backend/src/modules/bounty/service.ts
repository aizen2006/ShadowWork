import { BountyModel } from "./model";
import { db } from "../../db/index";
import { bountiesTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export abstract class bountyService {
  static async createBounty(
    title: string,
    description: string,
    reward: number,
    deadline: string,
    creator_id: number,
  ): Promise<BountyModel["bountyResponse"]> {
    const [row] = await db
      .insert(bountiesTable)
      .values({
        title,
        description,
        reward,
        deadline,
        creator_id,
      })
      .returning();

    return {
      id: row.id,
      title: row.title,
      description: row.description,
      reward: row.reward,
      deadline: row.deadline,
      creator_id: row.creator_id,
      status: row.status,
    };
  }

  static async getBounties(): Promise<BountyModel["bountyResponse"][]> {
    return await db.select().from(bountiesTable);
  }

  static async getBountyById(
    id: number,
  ): Promise<BountyModel["bountyResponse"] | null> {
    const [row] = await db
      .select()
      .from(bountiesTable)
      .where(eq(bountiesTable.id, id));
    return row ?? null;
  }
}
