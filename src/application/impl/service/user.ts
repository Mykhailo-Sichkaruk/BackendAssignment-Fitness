import { PasswordIncorrectError } from "../../../domain/model/user.js";
import type { UserService } from "../../../domain/service/user.js";
import type { UserRepo } from "../../../domain/repo/user.js";
import type { ROLE } from "../../../domain/model/user.js";
import { hash, verify } from "../utils.js";
import { Err, Ok } from "ts-results-es";

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

  async update(
    userId: number,
    name: string | undefined,
    surname: string | undefined,
    nickName: string | undefined,
    email: string | undefined,
    age: number | undefined,
    role: ROLE | undefined,
  ) {
    return await this.userRepo.update(
      userId,
      name,
      surname,
      nickName,
      email,
      age,
      role,
    );
  }

  async login(email: string, password: string) {
    const userResult = await this.userRepo.getByEmailWithPassword(email);
    if (userResult.isErr()) return userResult;
    if (verify(password, userResult.value.password)) {
      const userNoPassword = { ...userResult.value, password: undefined };
      return new Ok(userNoPassword);
    }

    return new Err(new PasswordIncorrectError());
  }

  async getAllData(userId: number) {
    return await this.userRepo.getAllData(userId);
  }

  async getPublicData(userId: number) {
    return await this.userRepo.getPublicData(userId);
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
