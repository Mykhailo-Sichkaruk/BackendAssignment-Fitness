import type {
  ROLE,
  UserAlreadyExistsError,
  UserEntity,
  UserEntityNoPassword,
  UserEntityPublicData,
  UserId,
  UserNotFoundError,
} from "../model/user.js";
import type { ExerciseId, ExerciseNotFoundError } from "../model/exercise.js";
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
    userId: UserId,
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
    userId: UserId,
  ): Promise<Result<UserEntityNoPassword, UserNotFoundError>>;
  getOnePublicData(
    userId: UserId,
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
    exerciseId: ExerciseId,
    userId: UserId,
    date: Date,
    duration: number,
  ): Promise<Result<void, UserNotFoundError | ExerciseNotFoundError>>;
}
