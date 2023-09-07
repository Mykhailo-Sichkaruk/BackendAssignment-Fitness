import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseNotFoundError,
} from "../model/exercise.js";
import type { Result } from "ts-results-es";

export interface ExerciseRepo {
  create(
    name: string,
    difficulty: EXERCISE_DIFFICULTY,
  ): Promise<ExerciseEntity>;
  update(
    exerciseId: number,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  delete(exerciseId: number): Promise<Result<void, ExerciseNotFoundError>>;
}
