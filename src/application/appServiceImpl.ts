import type { EXERCISE_DIFFICULTY } from "../domain/model/exercise.js";
import type { ExerciseService } from "../domain/service/exercise.js";
import type { ProgramService } from "../domain/service/program.js";
import type { UserService } from "../domain/service/user.js";
import type { AuthService } from "../domain/service/auth.js";
import type { AppService } from "./appService.js";
import type { ROLE } from "../domain/model/user.js";
import { Ok } from "ts-results-es";

export class App implements AppService {
  userService: UserService;
  programService: ProgramService;
  exerciseService: ExerciseService;
  authService: AuthService;

  constructor(
    userService: UserService,
    programService: ProgramService,
    exerciseService: ExerciseService,
    authService: AuthService,
  ) {
    this.userService = userService;
    this.programService = programService;
    this.exerciseService = exerciseService;
    this.authService = authService;
  }

  async registerJWT(
    name: string,
    surname: string,
    nickName: string,
    email: string,
    age: number,
    role: ROLE,
    password: string,
  ) {
    const userResult = await this.userService.create(
      name,
      surname,
      nickName,
      email,
      age,
      role,
      password,
    );
    if (userResult.isErr()) return userResult;
    const user = userResult.value;

    return new Ok(this.authService.generateTokens(user.id, user.role));
  }

  async loginJWT(email: string, password: string) {
    const userResult = await this.userService.login(email, password);
    if (userResult.isErr()) return userResult;
    const user = userResult.value;

    return new Ok(this.authService.generateTokens(user.id, user.role));
  }

  async updateUser(
    userId: number,
    name: string | undefined,
    surname: string | undefined,
    nickName: string | undefined,
    age: number | undefined,
    role: ROLE | undefined,
  ) {
    return await this.userService.userRepo.update(
      userId,
      name,
      surname,
      nickName,
      age,
      role,
    );
  }

  async createExercice(difficulty: EXERCISE_DIFFICULTY, name: string) {
    return await this.exerciseService.exerciseRepo.create(difficulty, name);
  }

  async updateExercice(
    exerciseId: number,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ) {
    return await this.exerciseService.exerciseRepo.update(
      exerciseId,
      name,
      difficulty,
    );
  }

  async getExerciceById(exerciseId: number) {
    return await this.exerciseService.exerciseRepo.getById(exerciseId);
  }

  async getManyExercices(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
    programId: number | undefined,
  ) {
    return await this.exerciseService.exerciseRepo.getMany(
      search,
      page,
      limit,
      programId,
    );
  }

  async deleteExercice(exerciseId: number) {
    return await this.exerciseService.exerciseRepo.delete(exerciseId);
  }

  async completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ) {
    return await this.userService.userRepo.addExerciceToCompletedList(
      exerciseId,
      userId,
      date,
      duration,
    );
  }

  async getProgramById(programId: number) {
    return await this.programService.programRepo.getById(programId);
  }

  async getManyPrograms(
    search: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ) {
    return await this.programService.programRepo.getMany(search, page, limit);
  }

  async addExerciceToProgram(exerciseId: number, programId: number) {
    return await this.programService.programRepo.addExercise(
      exerciseId,
      programId,
    );
  }

  async removeExerciceFromProgram(exerciseId: number, programId: number) {
    return await this.programService.programRepo.removeExervice(
      exerciseId,
      programId,
    );
  }

  async createProgram(name: string, difficulty: EXERCISE_DIFFICULTY) {
    return await this.programService.programRepo.create(name, difficulty);
  }

  async updateProgram(
    programId: number,
    name: string | undefined,
    difficulty: EXERCISE_DIFFICULTY | undefined,
  ) {
    return await this.programService.programRepo.update(
      programId,
      name,
      difficulty,
    );
  }

  async deleteProgram(programId: number) {
    return await this.programService.programRepo.delete(programId);
  }

  async getOneUserPrivateData(userId: number) {
    return await this.userService.userRepo.getOnePrivateData(userId);
  }

  async getOneUserPublicData(userId: number) {
    return await this.userService.userRepo.getOnePublicData(userId);
  }

  async getManyUsersPrivateData(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ) {
    return await this.userService.userRepo.getManyPrivateData(
      searchNick,
      page,
      limit,
    );
  }

  async getManyUsersPublicData(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ) {
    return await this.userService.userRepo.getManyPublicData(
      searchNick,
      page,
      limit,
    );
  }

  verifyAccessToken(token: string) {
    return this.authService.verifyAccessToken(token);
  }

  verifyRefreshToken(token: string) {
    const jwtPayload = this.authService.verifyRefreshToken(token);
    if (jwtPayload.isErr()) return jwtPayload;

    return new Ok(
      this.authService.generateTokens(
        jwtPayload.value.userId,
        jwtPayload.value.role,
      ),
    );
  }
}
