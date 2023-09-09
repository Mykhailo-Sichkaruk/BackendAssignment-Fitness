import type {
  ROLE,
  UserAlreadyExistsError,
  UserEntity,
  UserEntityNoPassword,
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
  ): Promise<Result<UserEntityNoPassword, UserAlreadyExistsError>>;
  update(
    userId: number,
    name: string | undefined,
    surname: string | undefined,
    nickName: string | undefined,
    age: number | undefined,
    role: ROLE | undefined,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  getByEmailWithPassword(
    email: string,
  ): Promise<Result<UserEntity, UserNotFoundError>>;
  getAllData(
    userId: number,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  getPublicData(
    userId: number,
  ): Promise<Result<UserEntityPublicData, UserNotFoundError>>;
  getAllDataAll(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<UserEntityNoPassword[]>;
  getPublicDataAll(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<UserEntityPublicData[]>;
  addExerciceToCompletedList(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ): Promise<Result<void, UserNotFoundError | ExerciseNotFoundError>>;
}
