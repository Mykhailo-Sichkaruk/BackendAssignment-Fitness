import type { ProgramId } from "#domain/model/program.js";
import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseId,
  ExerciseNotFoundError,
} from "#domain/model/exercise.js";
import type { Result } from "ts-results-es";

export interface ExerciseRepo {
  create(
    difficulty: EXERCISE_DIFFICULTY,
    name: string,
  ): Promise<ExerciseEntity>;
  getById(
    exerciseId: ExerciseId,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  getMany(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
    programId: ProgramId | undefined,
  ): Promise<ExerciseEntity[]>;
  update(
    exerciseId: ExerciseId,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  delete(exerciseId: ExerciseId): Promise<Result<void, ExerciseNotFoundError>>;
}
