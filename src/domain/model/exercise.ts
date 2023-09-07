import type { EXERCISE_DIFFICULTY } from "@prisma/client";
import type { ProgramEntity } from "./program.js";

export class ExerciseNotFoundError extends Error {
  constructor() {
    super("Exercise not found");
  }
}

export { EXERCISE_DIFFICULTY } from "@prisma/client";

export type ExerciseEntity = {
  id: number;
  difficulty: EXERCISE_DIFFICULTY;
  name: string;
  program: ProgramEntity;
};
