import Fastify from "fastify";
import { sessionRoutes } from "./routes/session";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { ok: true };
});

app.register(sessionRoutes);

const PORT = 3000;

app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});