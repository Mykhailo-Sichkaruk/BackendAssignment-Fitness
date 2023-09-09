import type { ROLE } from "@prisma/client";
import type { ExerciseEntity } from "./exercise.js";

export { ROLE } from "@prisma/client";

export class UserAlreadyExistsError extends Error {
  name: "UserAlreadyExistsError";
  constructor() {
    super("User already exists, please try again with different email");
    this.name = "UserAlreadyExistsError";
  }
}

export class UserNotFoundError extends Error {
  name: "UserNotFoundError";
  constructor(message: string) {
    super("User not found. " + message);
    this.name = "UserNotFoundError";
  }
}

export class PasswordIncorrectError extends Error {
  name: "PasswordIncorrectError";
  constructor() {
    super("Password incorrect");
    this.name = "PasswordIncorrectError";
  }
}

export type CompletedExercises = {
  id: number;
  userId: number;
  exercise?: ExerciseEntity | undefined;
  exerciseId: number;
  date: Date;
  duration: number;
};

export type UserEntity = {
  id: number;
  name: string;
  surname: string;
  nickName: string;
  email: string;
  password: string;
  age: number;
  role: ROLE;
  completedExercises: CompletedExercises[];
};

export type UserEntityNoPassword = Omit<UserEntity, "password"> & {
  password: undefined;
};

export type UserEntityPublicData = {
  name: string;
  nickName: string;
};
