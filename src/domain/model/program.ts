import type { EXERCISE_DIFFICULTY } from "@prisma/client";
import type { ExerciseEntity } from "./exercise.js";
import type { Opaque } from "ts-opaque";

export type { EXERCISE_DIFFICULTY } from "@prisma/client";
export class ProgramNotFoundError extends Error {
  name: "ProgramNotFoundError";
  constructor() {
    super("Program not found");
    this.name = "ProgramNotFoundError";
  }
}

export type ProgramId = Opaque<number, "ProgramId">;
export type ProgramEntity = {
  id: ProgramId;
  difficulty: EXERCISE_DIFFICULTY;
  name: string;

  exercises: ExerciseEntity[];
};
