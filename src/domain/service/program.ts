import type { Result } from "ts-results-es";
import type { InternalError } from "../error.js";
import type { ProgramRepo } from "../repo/program.js";
import type { ProgramEntity, ProgramNotFoundError } from "../model/program.js";
import type {
  EXERCISE_DIFFICULTY,
  ExerciseNotFoundError,
} from "../model/exercise.js";

export interface ProgramService {
  programRepo: ProgramRepo;
  create(
    name: string,
    description: string,
    difficulty: EXERCISE_DIFFICULTY,
  ): Promise<Result<ProgramEntity, InternalError>>;
  addExercice(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
  removeExercice(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
}
