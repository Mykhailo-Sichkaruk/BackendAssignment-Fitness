import type { ExerciseRepo } from "../repo/exercise.js";
import type { Result } from "ts-results-es";
import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseNotFoundError,
} from "../model/exercise.js";

export interface ExerciseService {
  exerciseRepo: ExerciseRepo;
  create(
    difficulty: EXERCISE_DIFFICULTY,
    name: string,
  ): Promise<ExerciseEntity>;
  update(
    exerciseId: number,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  delete(exerciseId: number): Promise<Result<void, ExerciseNotFoundError>>;
}
