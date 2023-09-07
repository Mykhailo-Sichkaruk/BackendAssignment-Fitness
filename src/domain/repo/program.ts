import type { ExerciseNotFoundError } from "../model/exercise.js";
import type { ProgramNotFoundError } from "../model/program.js";
import type { EXERCISE_DIFFICULTY } from "../model/program.js";
import type { ProgramEntity } from "../model/program.js";
import type { Result } from "ts-results-es";

export interface ProgramRepo {
  create(name: string, difficulty: EXERCISE_DIFFICULTY): Promise<ProgramEntity>;
  addToProgram(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
  removeFromProgram(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
}
