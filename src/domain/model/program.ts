import type { EXERCISE_DIFFICULTY } from "@prisma/client";
import type { ExerciseEntity } from "./exercise.js";

export type { EXERCISE_DIFFICULTY } from "@prisma/client";
export class ProgramNotFoundError extends Error {
  name: "ProgramNotFoundError";
  constructor() {
    super("Program not found");
    this.name = "ProgramNotFoundError";
  }
}

export type ProgramEntity = {
  id: number;
  difficulty: EXERCISE_DIFFICULTY;
  name: string;

  exercises: ExerciseEntity[];
};
