import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseId,
  ExerciseNotFoundError,
} from "#domain/model/exercise.js";
import type {
  PasswordIncorrectError,
  ROLE,
  UserAlreadyExistsError,
  UserEntityNoPassword,
  UserEntityPublicData,
  UserId,
  UserNotFoundError,
} from "#domain/model/user.js";
import type {
  ProgramEntity,
  ProgramId,
  ProgramNotFoundError,
} from "#domain/model/program.js";
import type { ExerciseService } from "#domain/service/exercise.js";
import type { ProgramService } from "#domain/service/program.js";
import type { UserService } from "#domain/service/user.js";
import type { AuthService } from "#domain/service/auth.js";
import type {
  JWT_PAYLOAD,
  JWTs,
  TokenInvalidError,
} from "#domain/model/auth.js";
import type { Result } from "ts-results-es";

export interface AppService {
  exerciseService: ExerciseService;
  programService: ProgramService;
  authService: AuthService;
  userService: UserService;

  createExercice(
    difficulty: EXERCISE_DIFFICULTY,
    name: string,
  ): Promise<ExerciseEntity>;
  updateExercice(
    exerciseId: ExerciseId,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  deleteExercice(
    exerciseId: ExerciseId,
  ): Promise<Result<void, ExerciseNotFoundError>>;
  getExerciceById(
    exerciseId: ExerciseId,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  getManyExercices(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
    programId: ProgramId | undefined,
  ): Promise<ExerciseEntity[]>;
  registerJWT(
    name: string,
    surname: string,
    nickName: string,
    email: string,
    age: number,
    role: ROLE,
    password: string,
  ): Promise<Result<JWTs, UserAlreadyExistsError>>;
  loginJWT(
    email: string,
    password: string,
  ): Promise<Result<JWTs, UserNotFoundError | PasswordIncorrectError>>;
  refreshJWT(refreshToken: string): Result<JWTs, TokenInvalidError>;
  updateUser(
    userId: UserId,
    name: string | undefined,
    surname: string | undefined,
    nickName: string | undefined,
    age: number | undefined,
    role: ROLE | undefined,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  verifyAccessToken(token: string): Result<JWT_PAYLOAD, TokenInvalidError>;
  verifyRefreshToken(token: string): Result<JWTs, TokenInvalidError>;
  completeExercise(
    exerciseId: ExerciseId,
    userId: UserId,
    date: Date,
    duration: number,
  ): Promise<Result<void, ExerciseNotFoundError | UserNotFoundError>>;
  createProgram(
    name: string,
    difficulty: EXERCISE_DIFFICULTY,
  ): Promise<ProgramEntity>;
  getProgramById(
    programId: ProgramId,
  ): Promise<Result<ProgramEntity, ProgramNotFoundError>>;
  getManyPrograms(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<ProgramEntity[]>;
  updateProgram(
    programId: ProgramId,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ): Promise<Result<ProgramEntity, ProgramNotFoundError>>;
  deleteProgram(
    programId: ProgramId,
  ): Promise<Result<void, ProgramNotFoundError>>;
  addExerciceToProgram(
    exerciseId: ExerciseId,
    programId: ProgramId,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
  removeExerciceFromProgram(
    exerciseId: ExerciseId,
    programId: ProgramId,
  ): Promise<Result<void, ProgramNotFoundError | ExerciseNotFoundError>>;
  getOneUserPrivateData(
    userId: UserId,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  getOneUserPrivateData(
    userId: UserId,
  ): Promise<Result<UserEntityPublicData, UserNotFoundError>>;
  getManyUsersPrivateData(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<UserEntityNoPassword[]>;
  getManyUsersPublicData(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<UserEntityPublicData[]>;
}
