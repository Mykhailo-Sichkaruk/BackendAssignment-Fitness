import type { ExerciseNotFoundError } from "../model/exercise.js";
import type { ProgramNotFoundError } from "../model/program.js";
import type { EXERCISE_DIFFICULTY } from "../model/program.js";
import type { ProgramEntity } from "../model/program.js";
import type { Result } from "ts-results-es";

export interface ProgramRepo {
  create(name: string, difficulty: EXERCISE_DIFFICULTY): Promise<ProgramEntity>;
  update(
    programId: number,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ): Promise<Result<ProgramEntity, ProgramNotFoundError>>;
  getById(
    programId: number,
  ): Promise<Result<ProgramEntity, ProgramNotFoundError>>;
  getMany(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<ProgramEntity[]>;
  delete(programId: number): Promise<Result<void, ProgramNotFoundError>>;
  addExercise(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
  removeExervice(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
}
