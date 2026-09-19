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

export function checkAnswer(state: GameState, input: number): GameState {
    if (!state.isRunning) {
        return state;
    }

    if (input === state.currentProblem.answer) {
        return {
            ...state,
            score: state.score + 1,
            currentProblem: generateProblem(),
        };
    }

    return state;
}

export function tick(state: GameState): GameState {
    if (!state.isRunning) {
        return state;
    }

    const timeRemaining = state.timeRemaining - 1;

    if (timeRemaining <= 0) {
        return { ...state, timeRemaining: 0, isRunning: false };
    }

    return { ...state, timeRemaining };
}

export function isGameOver(state: GameState): boolean {
    return !state.isRunning;
}