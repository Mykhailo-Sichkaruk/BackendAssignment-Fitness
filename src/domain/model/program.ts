import type { ExerciseEntity } from "./exercise.js";

export class ProgramNotFoundError extends Error {
  constructor() {
    super("Program not found");
  }
}

export const enum EXERCISE_DIFFICULTY {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
export type ProgramEntity = {
  id: number;
  difficulty: EXERCISE_DIFFICULTY;
  name: string;

  exercises: ExerciseEntity[];
};
