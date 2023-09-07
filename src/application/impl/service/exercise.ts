import type { EXERCISE_DIFFICULTY } from "../../../domain/model/exercise.js";
import type { ExerciseService } from "../../../domain/service/exercise.js";
import type { ExerciseRepo } from "../../../domain/repo/exercise.js";

export class ExerciseServiceImpl implements ExerciseService {
  exerciseRepo: ExerciseRepo;
  constructor(repo: ExerciseRepo) {
    this.exerciseRepo = repo;
  }

  async create(name: string, difficulty: EXERCISE_DIFFICULTY) {
    return await this.exerciseRepo.create(name, difficulty);
  }

  async update(
    exerciseId: number,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ) {
    return await this.exerciseRepo.update(exerciseId, name, difficulty);
  }

  async delete(exerciseId: number) {
    return await this.exerciseRepo.delete(exerciseId);
  }
}
