import type {
  PasswordIncorrectError,
  UserAlreadyExistsError,
  UserEntity,
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
    role: string,
    password: string,
  ): Promise<Result<UserEntity, UserAlreadyExistsError>>;
  login(
    email: string,
    password: string,
  ): Promise<Result<UserEntity, UserNotFoundError | PasswordIncorrectError>>;
  getAllData(userId: number): Promise<Result<UserEntity, UserNotFoundError>>;
  getAllDataAll(): Promise<UserEntity[]>;
  getPublicDataAll(): Promise<UserEntityPublicData[]>;
  completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ): Promise<Result<void, UserNotFoundError | ExerciseNotFoundError>>;
}
