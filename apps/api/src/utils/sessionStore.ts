/**
 * sessionStore.ts
 *
 * A temporary, in-memory stand-in for the real database. Sessions live in a
 * plain Map for now, keyed by sessionId. This lets the session endpoints get
 * built and tested end-to-end before Postgres/Drizzle are wired up — when
 * that happens, only this file needs to change (swap the Map operations for
 * real SQL queries); the routes that call it won't need to change at all.
 *
 * Known limitation, worth being upfront about: this resets every time the
 * server restarts, and won't work at all once you have more than one server
 * instance running. Both of those are exactly what the real database fixes.
 */

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

export interface ScoreEntry {
  sessionId: string;
  name: string;
  score: number;
  createdAt: Date;
}

const scores: ScoreEntry[] = [];
 
export function addScore(entry: ScoreEntry): void {
  scores.push(entry);
}
 
export function getTopScores(limit: number): ScoreEntry[] {
  return [...scores].sort((a, b) => b.score - a.score).slice(0, limit);
}