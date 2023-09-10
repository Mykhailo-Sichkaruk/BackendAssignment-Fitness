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
  getOnePrivateData(
    userId: number,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  getOnePublicData(
    userId: number,
  ): Promise<Result<UserEntityPublicData, UserNotFoundError>>;
  getManyPrivateData(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ): Promise<UserEntityNoPassword[]>;
  getManyPublicData(
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
