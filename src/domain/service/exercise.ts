import type { ExerciseRepo } from "../repo/exercise.js";

export interface ExerciseService {
  exerciseRepo: ExerciseRepo;
}
