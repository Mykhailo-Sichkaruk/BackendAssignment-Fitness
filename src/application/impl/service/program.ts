import type { ProgramService } from "../../../domain/service/program.js";
import type { ProgramRepo } from "../../../domain/repo/program.js";

export class ProgramServiceImpl implements ProgramService {
  programRepo: ProgramRepo;
  constructor(repo: ProgramRepo) {
    this.programRepo = repo;
  }
}
