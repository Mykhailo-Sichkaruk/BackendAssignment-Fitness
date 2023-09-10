import type { ExerciseId, ExerciseNotFoundError } from "../model/exercise.js";
import type { ProgramId, ProgramNotFoundError } from "../model/program.js";
import type { EXERCISE_DIFFICULTY } from "../model/program.js";
import type { ProgramEntity } from "../model/program.js";
import type { Result } from "ts-results-es";

export interface ProgramRepo {
  create(name: string, difficulty: EXERCISE_DIFFICULTY): Promise<ProgramEntity>;
  update(
    programId: ProgramId,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ): Promise<Result<ProgramEntity, ProgramNotFoundError>>;
  getById(
    programId: ProgramId,
  ): Promise<Result<ProgramEntity, ProgramNotFoundError>>;
  getMany(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<ProgramEntity[]>;
  delete(programId: ProgramId): Promise<Result<void, ProgramNotFoundError>>;
  addExercise(
    exerciseId: ExerciseId,
    programId: ProgramId,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
  removeExervice(
    exerciseId: ExerciseId,
    programId: ProgramId,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
}
