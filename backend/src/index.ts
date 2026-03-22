import "dotenv/config";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { bounty } from "./modules/bounty";
import { health } from "./modules/health";
import { submissions } from "./modules/submissions";
import { user } from "./modules/user";
import { winner } from "./modules/winner";

const corsOrigins = process.env.CORS_ORIGIN?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const app = new Elysia()
  .use(
    cors({
      origin: corsOrigins?.length ? corsOrigins : true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
    }),
  )
  .get("/", () => "Hello Elysia")
  .use(health)
  .use(user)
  .use(bounty)
  .use(submissions)
  .use(winner)
  .listen(Number(process.env.PORT) || 3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} (set PORT to override; 3000 is usually Next.js)`,
);
