import type { Result } from "ts-results-es";
import type { ProgramRepo } from "../repo/program.js";
import type { ProgramEntity, ProgramNotFoundError } from "../model/program.js";
import type {
  EXERCISE_DIFFICULTY,
  ExerciseNotFoundError,
} from "../model/exercise.js";

export interface ProgramService {
  programRepo: ProgramRepo;
  create(name: string, difficulty: EXERCISE_DIFFICULTY): Promise<ProgramEntity>;
  update(
    programId: number,
    name: string,
    difficulty: EXERCISE_DIFFICULTY,
  ): Promise<Result<ProgramEntity, ProgramNotFoundError>>;
  delete(programId: number): Promise<Result<void, ProgramNotFoundError>>;
  addExercice(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
  removeExercice(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
}
