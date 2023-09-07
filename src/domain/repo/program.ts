import type { Result } from "ts-results-es";
import type { InternalError, NotFoundError } from "../error.js";
import type { ProgramEntity } from "../model/program.js";
import type { EXERCISE_DIFFICULTY } from "../model/exercise.js";

export interface ProgramRepo {
  create(
    name: string,
    difficulty: EXERCISE_DIFFICULTY,
  ): Promise<Result<ProgramEntity, InternalError>>;
  addToProgram(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, NotFoundError>>;
  removeFromProgram(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, NotFoundError>>;
}
