import type { EXERCISE_DIFFICULTY } from "../../../domain/model/program.js";
import type { ProgramService } from "../../../domain/service/program.js";
import type { ProgramRepo } from "../../../domain/repo/program.js";

export class ProgramServiceImpl implements ProgramService {
  programRepo: ProgramRepo;
  constructor(repo: ProgramRepo) {
    this.programRepo = repo;
  }

  async create(name: string, difficulty: EXERCISE_DIFFICULTY) {
    return await this.programRepo.create(name, difficulty);
  }

  async update(
    programId: number,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ) {
    return await this.programRepo.update(programId, name, difficulty);
  }

  async delete(programId: number) {
    return await this.programRepo.delete(programId);
  }

  async addExercice(exerciseId: number, programId: number) {
    return await this.programRepo.addToProgram(exerciseId, programId);
  }

  async removeExercice(exerciseId: number, programId: number) {
    return await this.programRepo.removeFromProgram(exerciseId, programId);
  }
}
