import { generateProblem, Problem } from "./questionGenerator";
export const ROUND_DURATION = 120;

export interface GameState {
  currentProblem: Problem;
  score: number;
  timeRemaining: number;
  isRunning: boolean;
}

export function startGame(): GameState {
    return {
        currentProblem: generateProblem(),
        score: 0,
        timeRemaining: ROUND_DURATION,
        isRunning: true,
    };
}