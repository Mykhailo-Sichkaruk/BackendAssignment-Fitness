import type { ExerciseRepo } from "#domain/repo/exercise.js";

export interface ExerciseService {
  exerciseRepo: ExerciseRepo;
}
