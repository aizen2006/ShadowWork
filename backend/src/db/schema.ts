import generateUniqueString from "../utils/generateUniqueId";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

const statusEnum = pgEnum("status", ["open", "closed"]);

const ANON_ID_LEN = 24;

export const usersTable = table("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  wallet_address: t.varchar().notNull().unique(),
  anon_id: t
    .varchar()
    .$default(() => generateUniqueString(ANON_ID_LEN))
    .notNull()
    .unique(),
  created_at: t.varchar().notNull(),
});

export const bountiesTable = table("bounties",{
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    title: t.varchar().notNull(),
    description: t.text().notNull(),
    reward: t.integer().notNull(),
    deadline: t.varchar().notNull(),
    creator_id: t.integer().references(() => usersTable.id).notNull(),
    status: statusEnum().default("open").notNull()
});

export const submissionsTable = table("submissions",{
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    bounty_id: t.integer().references(() => bountiesTable.id).notNull(),
    submitter_id: t.integer().references(() => usersTable.id).notNull(),
    content: t.text().notNull(),
    created_at: t.varchar().notNull(),
});

export const winnersTable = table("winners", {
  bounty_id: t
    .integer()
    .primaryKey()
    .references(() => bountiesTable.id, { onDelete: "cascade" }),
  winner_anon_id: t.varchar().notNull(),
});

export const reputationTable = table("reputaion",{
    anon_id: t.varchar().primaryKey().notNull(),
    wins: t.integer().default(0).notNull(),
    total_submissions: t.integer().default(0).notNull(),
    earnings: t.integer().default(0).notNull(),
});
