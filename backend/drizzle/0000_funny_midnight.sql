CREATE TABLE "bounties" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bounties_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"reward" integer NOT NULL,
	"deadline" varchar NOT NULL,
	"creator_id" integer NOT NULL,
	"status" "status" DEFAULT 'open' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reputaion" (
	"anon_id" varchar PRIMARY KEY NOT NULL,
	"wins" integer DEFAULT 0 NOT NULL,
	"total_submissions" integer DEFAULT 0 NOT NULL,
	"earnings" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "submissions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bounty_id" integer NOT NULL,
	"submitter_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"wallet_address" varchar NOT NULL,
	"anon_id" varchar NOT NULL,
	"created_at" varchar NOT NULL,
	CONSTRAINT "users_created_at_unique" UNIQUE("created_at")
);
--> statement-breakpoint
CREATE TABLE "winners" (
	"bounty_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "winners_bounty_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"winner_anon_id" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bounties" ADD CONSTRAINT "bounties_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_bounty_id_bounties_id_fk" FOREIGN KEY ("bounty_id") REFERENCES "public"."bounties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_submitter_id_users_id_fk" FOREIGN KEY ("submitter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;