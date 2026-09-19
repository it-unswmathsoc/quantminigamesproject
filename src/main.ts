import { startGame, checkAnswer, tick, isGameOver, GameState } from "./engine";

const startScreen = document.getElementById("start-screen") as HTMLElement;
const gameScreen = document.getElementById("game-screen") as HTMLElement;
const endScreen = document.getElementById("end-screen") as HTMLElement;
 
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const againBtn = document.getElementById("again-btn") as HTMLButtonElement;
const answerInput = document.getElementById("answer-input") as HTMLInputElement;
 
const scoreOut = document.getElementById("score-out") as HTMLElement;
const timeOut = document.getElementById("time-out") as HTMLElement;
const equationOut = document.getElementById("equation-out") as HTMLElement;
const finalScoreOut = document.getElementById("final-score") as HTMLElement;

let state: GameState | null = null;
let timerHandle: ReturnType<typeof setInterval> | null = null;

function render(current: GameState): void {
    scoreOut.textContent = String(current.score)
    const minutes = Math.floor(current.timeRemaining / 60);
    const seconds = current.timeRemaining % 60;
    timeOut.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    equationOut.textContent = `${current.currentProblem.text} =`;
}

function showScreen(screen: "start" | "playing" | "end"): void {
    startScreen.style.display = screen === "start" ? "block" : "none";
    gameScreen.style.display = screen === "playing" ? "block" : "none";
    endScreen.style.display   = screen === "end" ? "block" : "none";
}

function beginRound(): void {
    state = 
}

