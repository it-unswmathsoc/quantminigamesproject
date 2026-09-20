import type { FastifyInstance } from "fastify";
import { generateSeed } from "../utils/generateSeed";
import { createSession } from "../utils/sessionStore";

export async function sessionRoutes(app: FastifyInstance) {
  app.post("/session/start", async () => {
    const seed = generateSeed();
    const session = createSession(seed);

    return {
      sessionId: session.id,
      seed: session.seed,
    };
  });
}