import type {
  PasswordIncorrectError,
  ROLE,
  UserAlreadyExistsError,
  UserEntityNoPassword,
  UserNotFoundError,
} from "../model/user.js";
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
  login(
    email: string,
    password: string,
  ): Promise<
    Result<UserEntityNoPassword, UserNotFoundError | PasswordIncorrectError>
  >;
}
