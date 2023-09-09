import type { ExerciseService } from "../../../domain/service/exercise.js";
import type { ExerciseRepo } from "../../../domain/repo/exercise.js";

export class ExerciseServiceImpl implements ExerciseService {
  exerciseRepo: ExerciseRepo;
  constructor(repo: ExerciseRepo) {
    this.exerciseRepo = repo;
  }
}
