import type { EXERCISE_DIFFICULTY, ExerciseEntity } from "../model/exercise.js";
import type { ExerciseRepo } from "../repo/exercise.js";
import type { Result } from "ts-results-es";
import type { NotFoundError } from "../error.js";

export interface ExerciseService {
  exerciseRepo: ExerciseRepo;
  create(
    difficulty: EXERCISE_DIFFICULTY,
    name: string,
  ): Promise<Result<ExerciseEntity, NotFoundError>>;
  update(
    exerciseId: number,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ): Promise<Result<ExerciseEntity, NotFoundError>>;
  delete(exerciseId: number): Promise<Result<void, NotFoundError>>;
}
