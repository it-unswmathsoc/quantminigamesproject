export type Operation = "add" | "sub" | "mult" | "div";

export interface Problem {
  text: string;
  answer: number;
  operation: Operation;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(): Problem {
  const operations: Operation[] = ["add", "sub", "mult", "div"];
  const operation = operations[randInt(0, operations.length - 1)];

  if (operation === "add") {
    const a = randInt(2, 100);
    const b = randInt(2, 100);
    return { text: `${a} + ${b}`, answer: a + b, operation };
  }

  if (operation === "sub") {
    const p = randInt(2, 100);
    const q = randInt(2, 100);
    return { text: `${p + q} - ${q}`, answer: p, operation };
  }

  if (operation === "mult") {
    const a = randInt(2, 12);
    const b = randInt(2, 12);
    return { text: `${a} * ${b}`, answer: a * b, operation };
  }

  else {
    const divisor = randInt(2, 12);
    const quotient = randInt(2, 12);
    const product = divisor * quotient;
    return { text: `${product} / ${divisor}`, answer: quotient, operation };
  }
}