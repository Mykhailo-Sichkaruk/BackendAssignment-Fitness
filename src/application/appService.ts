import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseNotFoundError,
} from "../domain/model/exercise.js";
import type {
  PasswordIncorrectError,
  ROLE,
  UserAlreadyExistsError,
  UserEntityNoPassword,
  UserEntityPublicData,
  UserNotFoundError,
} from "../domain/model/user.js";
import type {
  ProgramEntity,
  ProgramNotFoundError,
} from "../domain/model/program.js";
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
  ): Promise<ExerciseEntity>;
  updateExercice(
    exerciseId: number,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  deleteExercice(
    exerciseId: number,
  ): Promise<Result<void, ExerciseNotFoundError>>;
  // getExercice(
  //   exerciseId: number,
  // ): Promise<Result<ExerciseEntity, ExerciseNotFoundError>>;
  // getAllExercices(): Promise<ExerciseEntity[]>;
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
  updateUser(
    userId: number,
    name: string | undefined,
    surname: string | undefined,
    nickName: string | undefined,
    email: string | undefined,
    age: number | undefined,
    role: ROLE | undefined,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  verifyAccessToken(token: string): Result<JWT_PAYLOAD, TokenInvalidError>;
  verifyRefreshToken(token: string): Result<JWTs, TokenInvalidError>;
  completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ): Promise<Result<void, ExerciseNotFoundError | UserNotFoundError>>;
  createProgram(
    name: string,
    difficulty: EXERCISE_DIFFICULTY,
  ): Promise<ProgramEntity>;
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
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  getUserPublicData(
    userId: number,
  ): Promise<Result<UserEntityPublicData, UserNotFoundError>>;
  getAllUsersAllData(): Promise<UserEntityNoPassword[]>;
  getAllUsersPublicData(): Promise<UserEntityPublicData[]>;
}
