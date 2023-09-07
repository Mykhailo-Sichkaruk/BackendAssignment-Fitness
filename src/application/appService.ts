import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseNotFoundError,
} from "../domain/model/exercise.js";
import type {
  UserAlreadyExistsError,
  UserEntity,
  UserEntityPublicData,
  UserNotFoundError,
} from "../domain/model/user.js";
import type { ProgramNotFoundError } from "../domain/model/program.js";
import type {
  EmailNotFoundError,
  InternalError,
  PasswordIncorrectError,
} from "../domain/error.js";
import type { ExerciseService } from "../domain/service/exercise.js";
import type { ProgramService } from "../domain/service/program.js";
import type { UserService } from "../domain/service/user.js";
import type { AuthService } from "../domain/service/auth.js";
import type {
  JWT_PAYLOAD,
  JWTs,
  TokenInvalidError,
} from "../domain/model/auth.js";
import type { Result } from "ts-results-es";

export interface AppService {
  exerciseService: ExerciseService;
  programService: ProgramService;
  authService: AuthService;
  userService: UserService;

  createExercice(
    difficulty: EXERCISE_DIFFICULTY,
    name: string,
    programId: number,
  ): Promise<Result<ExerciseEntity, ProgramNotFoundError>>;
  updateExercice(
    exerciseId: number,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  deleteExercice(
    exerciseId: number,
  ): Promise<Result<void, ExerciseNotFoundError>>;
  registerJWT(
    name: string,
    surname: string,
    nickName: string,
    email: string,
    age: number,
    role: string,
    password: string,
  ): Promise<Result<JWTs, UserAlreadyExistsError | InternalError>>;
  loginJWT(
    email: string,
    password: string,
  ): Promise<
    Result<JWTs, EmailNotFoundError | InternalError | PasswordIncorrectError>
  >;
  verifyAccessToken(
    token: string,
  ): Result<JWT_PAYLOAD, InternalError | TokenInvalidError>;
  verifyRefreshToken(
    token: string,
  ): Result<JWTs, InternalError | TokenInvalidError>;
  completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ): Promise<Result<void, ExerciseNotFoundError>>;
  addExerciceToProgram(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ExerciseNotFoundError | ProgramNotFoundError>>;
  removeExerciceFromProgram(
    exerciseId: number,
    programId: number,
  ): Promise<Result<void, ProgramNotFoundError | ExerciseNotFoundError>>;
  getUserAllData(
    userId: number,
  ): Promise<Result<UserEntity, UserNotFoundError>>;
  getAllUsersAllData(): Promise<Result<UserEntity[], InternalError>>;
  getAllUsersPublicData(): Promise<
    Result<UserEntityPublicData[], InternalError>
  >;
}
