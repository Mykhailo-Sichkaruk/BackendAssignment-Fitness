import type {
  ROLE,
  UserAlreadyExistsError,
  UserEntity,
  UserEntityPublicData,
  UserNotFoundError,
} from "../model/user.js";
import type { ExerciseNotFoundError } from "../model/exercise.js";
import type { Result } from "ts-results-es";

export interface UserRepo {
  create(
    name: string,
    surname: string,
    nickName: string,
    email: string,
    age: number,
    role: ROLE,
    hashedPassword: string,
  ): Promise<Result<UserEntity, UserAlreadyExistsError>>;
  getByEmail(email: string): Promise<Result<UserEntity, UserNotFoundError>>;
  getAllData(userId: number): Promise<Result<UserEntity, UserNotFoundError>>;
  getAllDataAll(): Promise<UserEntity[]>;
  getPublicDataAll(): Promise<UserEntityPublicData[]>;
  addExerciceToCompletedList(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ): Promise<Result<void, UserNotFoundError | ExerciseNotFoundError>>;
}
