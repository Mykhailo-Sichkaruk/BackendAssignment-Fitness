import type { UserRepo } from "#domain/repo/user.js";
import type { Result } from "ts-results-es";
import type {
  PasswordIncorrectError,
  ROLE,
  UserAlreadyExistsError,
  UserEntityNoPassword,
  UserNotFoundError,
} from "#domain/model/user.js";

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
  login(
    email: string,
    password: string,
  ): Promise<
    Result<UserEntityNoPassword, UserNotFoundError | PasswordIncorrectError>
  >;
}
