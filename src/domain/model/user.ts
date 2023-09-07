import type { ROLE } from "@prisma/client";
import type { ExerciseEntity } from "./exercise.js";

export { ROLE } from "@prisma/client";

export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exists, please try again with different email");
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
  }
}

export class PasswordIncorrectError extends Error {
  constructor() {
    super("Password incorrect");
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

export type UserEntityNoPassword = Omit<UserEntity, "password">;

export type UserEntityPublicData = {
  name: string;
  nickName: string;
};
