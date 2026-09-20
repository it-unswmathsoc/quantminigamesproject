import { randomUUID } from "crypto";

export interface Session {
  id: string;
  seed: number;
  startedAt: Date;
  finishedAt: Date | null;
}

const sessions = new Map<string, Session>();

export function createSession(seed: number): Session {
  const session: Session = {
    id: randomUUID(),
    seed,
    startedAt: new Date(),
    finishedAt: null,
  };
  sessions.set(session.id, session);
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export function markSessionFinished(id: string): void {
  const session = sessions.get(id);
  if (session) {
    session.finishedAt = new Date();
  }
}