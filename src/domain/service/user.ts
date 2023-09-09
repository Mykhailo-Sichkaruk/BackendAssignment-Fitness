import type {
  PasswordIncorrectError,
  ROLE,
  UserAlreadyExistsError,
  UserEntityNoPassword,
  UserEntityPublicData,
  UserNotFoundError,
} from "../model/user.js";
import type { ExerciseNotFoundError } from "../model/exercise.js";
import type { Result } from "ts-results-es";
import type { UserRepo } from "../repo/user.js";

export interface UserService {
  userRepo: UserRepo;
  create(
    name: string,
    surname: string,
    nickName: string,
    email: string,
    age: number,
    role: ROLE,
    password: string,
  ): Promise<Result<UserEntityNoPassword, UserAlreadyExistsError>>;
  update(
    userId: number,
    name: string | undefined,
    surname: string | undefined,
    nickName: string | undefined,
    email: string | undefined,
    age: number | undefined,
    role: ROLE | undefined,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  login(
    email: string,
    password: string,
  ): Promise<
    Result<UserEntityNoPassword, UserNotFoundError | PasswordIncorrectError>
  >;
  getAllData(
    userId: number,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  getPublicData(
    userId: number,
  ): Promise<Result<UserEntityPublicData, UserNotFoundError>>;
  getAllDataAll(): Promise<UserEntityNoPassword[]>;
  getPublicDataAll(): Promise<UserEntityPublicData[]>;
  completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ): Promise<Result<void, UserNotFoundError | ExerciseNotFoundError>>;
}
