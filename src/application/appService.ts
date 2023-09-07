import type {
  EXERCISE_DIFFICULTY,
  ExerciseEntity,
  ExerciseNotFoundError,
} from "../domain/model/exercise.js";
import type {
  PasswordIncorrectError,
  UserAlreadyExistsError,
  UserEntity,
  UserEntityPublicData,
  UserNotFoundError,
} from "../domain/model/user.js";
import type { ProgramNotFoundError } from "../domain/model/program.js";
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
  registerJWT(
    name: string,
    surname: string,
    nickName: string,
    email: string,
    age: number,
    role: string,
    password: string,
  ): Promise<Result<JWTs, UserAlreadyExistsError>>;
  loginJWT(
    email: string,
    password: string,
  ): Promise<Result<JWTs, UserNotFoundError | PasswordIncorrectError>>;
  verifyAccessToken(token: string): Result<JWT_PAYLOAD, TokenInvalidError>;
  verifyRefreshToken(token: string): Result<JWTs, TokenInvalidError>;
  completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ): Promise<Result<void, ExerciseNotFoundError | UserNotFoundError>>;
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
  getAllUsersAllData(): Promise<UserEntity[]>;
  getAllUsersPublicData(): Promise<UserEntityPublicData[]>;
}
