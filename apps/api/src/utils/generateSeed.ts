import { randomBytes } from "crypto";

export function generateSeed(): number {
  return randomBytes(4).readUInt32BE(0);
}