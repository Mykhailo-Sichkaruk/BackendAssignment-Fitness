import { PasswordIncorrectError } from "../../../domain/model/user.js";
import type { UserService } from "../../../domain/service/user.js";
import type { UserRepo } from "../../../domain/repo/user.js";
import type { ROLE } from "../../../domain/model/user.js";
import { hash, verify } from "../utils.js";
import { Err } from "ts-results-es";

export class UserServiceImpl implements UserService {
  userRepo: UserRepo;
  constructor(repo: UserRepo) {
    this.userRepo = repo;
  }

  async create(
    name: string,
    surname: string,
    nickName: string,
    email: string,
    age: number,
    role: ROLE,
    password: string,
  ) {
    return await this.userRepo.create(
      name,
      surname,
      nickName,
      email,
      age,
      role,
      hash(password),
    );
  }

  async login(email: string, password: string) {
    const userResult = await this.userRepo.getByEmail(email);
    if (userResult.isErr() || verify(password, userResult.value.password))
      return userResult;

    return new Err(new PasswordIncorrectError());
  }

  async getAllData(userId: number) {
    return await this.userRepo.getAllData(userId);
  }

  async getAllDataAll() {
    return await this.userRepo.getAllDataAll();
  }

  async getPublicDataAll() {
    return await this.userRepo.getPublicDataAll();
  }

  async completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ) {
    return await this.userRepo.addExerciceToCompletedList(
      exerciseId,
      userId,
      date,
      duration,
    );
  }
}
