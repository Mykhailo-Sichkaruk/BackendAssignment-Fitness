import type { EXERCISE_DIFFICULTY } from "@prisma/client";
import type { ProgramEntity } from "./program.js";

export type { EXERCISE_DIFFICULTY } from "@prisma/client";
export class ExerciseNotFoundError extends Error {
  name: "ExerciseNotFoundError";
  constructor() {
    super("Exercise not found");
    this.name = "ExerciseNotFoundError";
  }
}

export type ExerciseEntity = {
  id: number;
  difficulty: EXERCISE_DIFFICULTY;
  name: string;
  programId?: number | undefined;
  program?: ProgramEntity | undefined;
};
