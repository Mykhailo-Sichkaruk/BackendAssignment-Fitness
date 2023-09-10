import type { ProgramRepo } from "#domain/repo/program.js";

export interface ProgramService {
  programRepo: ProgramRepo;
}
