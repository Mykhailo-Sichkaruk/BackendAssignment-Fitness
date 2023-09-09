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
    email: string | undefined,
    age: number | undefined,
    role: ROLE | undefined,
  ) {
    return await this.userService.update(
      userId,
      name,
      surname,
      nickName,
      email,
      age,
      role,
    );
  }

  async createExercice(difficulty: EXERCISE_DIFFICULTY, name: string) {
    return await this.exerciseService.create(difficulty, name);
  }

  async updateExercice(
    exerciseId: number,
    difficulty: EXERCISE_DIFFICULTY | undefined,
    name: string | undefined,
  ) {
    return await this.exerciseService.update(exerciseId, difficulty, name);
  }

  async deleteExercice(exerciseId: number) {
    return await this.exerciseService.delete(exerciseId);
  }

  async completeExercise(
    exerciseId: number,
    userId: number,
    date: Date,
    duration: number,
  ) {
    return await this.userService.completeExercise(
      exerciseId,
      userId,
      date,
      duration,
    );
  }

  async addExerciceToProgram(exerciseId: number, programId: number) {
    return await this.programService.addExercice(exerciseId, programId);
  }

  async removeExerciceFromProgram(exerciseId: number, programId: number) {
    return await this.programService.removeExercice(exerciseId, programId);
  }

  async createProgram(name: string, difficulty: EXERCISE_DIFFICULTY) {
    return await this.programService.create(name, difficulty);
  }

  async getUserAllData(userId: number) {
    return await this.userService.getAllData(userId);
  }

  async getUserPublicData(userId: number) {
    return await this.userService.getPublicData(userId);
  }

  async getAllUsersAllData() {
    return await this.userService.getAllDataAll();
  }

  async getAllUsersPublicData() {
    return await this.userService.getPublicDataAll();
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
