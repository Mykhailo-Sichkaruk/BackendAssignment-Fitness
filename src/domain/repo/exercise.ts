import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseNotFoundError,
} from "../model/exercise.js";
import type { Result } from "ts-results-es";

export interface ExerciseRepo {
  create(
    difficulty: EXERCISE_DIFFICULTY,
    name: string,
  ): Promise<ExerciseEntity>;
  getById(
    exerciseId: number,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  getMany(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
    programId: number | undefined,
  ): Promise<ExerciseEntity[]>;
  update(
    exerciseId: number,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  delete(exerciseId: number): Promise<Result<void, ExerciseNotFoundError>>;
}
