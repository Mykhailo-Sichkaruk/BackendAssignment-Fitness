import type { EXERCISE_DIFFICULTY, ExerciseEntity } from "../model/exercise.js";
import type { Result } from "ts-results-es";
import type { NotFoundError } from "../error.js";

export interface ExerciseRepo {
  create(
    name: string,
    difficulty: EXERCISE_DIFFICULTY,
  ): Promise<Result<ExerciseEntity, NotFoundError>>;
  update(
    exerciseId: number,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ): Promise<Result<ExerciseEntity, NotFoundError>>;
  delete(exerciseId: number): Promise<Result<void, NotFoundError>>;
}
