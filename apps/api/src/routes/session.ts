import type { FastifyInstance } from "fastify";
import { generateSeed } from "../utils/generateSeed";
import {
  createSession,
  getSession,
  markSessionFinished,
  addScore,
  getTopScores,
} from "../utils/sessionStore";

const ROUND_DURATION_SECONDS = 120;
// Will make this non constant in the future

const MAX_PLAUSIBLE_ANSWERS_PER_SECOND = 2;
 
interface FinishBody {
  sessionId: string;
  name: string;
  score: number;
}
 
export async function sessionRoutes(app: FastifyInstance) {
  app.post("/session/start", async () => {
    const seed = generateSeed();
    const session = createSession(seed);
 
    return {
      sessionId: session.id,
      seed: session.seed,
    };
  });
 
  app.post("/session/finish", async (request, reply) => {
    const { sessionId, name, score } = request.body as FinishBody;
 
    const session = getSession(sessionId);
    if (!session) {
      return reply.code(404).send({ error: "session not found" });
    }
    if (session.finishedAt) {
      return reply.code(400).send({ error: "session already finished" });
    }
 
    const elapsedSeconds = (Date.now() - session.startedAt.getTime()) / 1000;
 
    // Loose guardrails for now:
    //  - must have actually played roughly the full round (some tolerance
    //    for network latency between the timer ending and this call arriving)
    //  - score must be physically plausible for the time elapsed
    // TODO: once the shared seeded question generator exists, replace this
    // with real validation: re-derive the problem sequence from
    // session.seed and check the submitted score against it directly.
    const tooFast = elapsedSeconds < ROUND_DURATION_SECONDS - 5;
    const tooHighForTime = score > elapsedSeconds * MAX_PLAUSIBLE_ANSWERS_PER_SECOND;
 
    if (tooFast || tooHighForTime) {
      return reply.code(400).send({ error: "score rejected" });
    }
 
    markSessionFinished(sessionId);
    addScore({ sessionId, name, score, createdAt: new Date() });
 
    return { ok: true };
  });
 
  app.get("/leaderboard", async (request) => {
    const query = request.query as { limit?: string };
    const limit = query.limit ? parseInt(query.limit, 10) : 10;
    return getTopScores(limit);
  });
}