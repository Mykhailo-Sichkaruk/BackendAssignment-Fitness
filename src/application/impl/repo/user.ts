import type { UserEntityNoPassword } from "../../../domain/model/user.js";
import { ExerciseNotFoundError } from "../../../domain/model/exercise.js";
import type { UserRepo } from "../../../domain/repo/user.js";
import prisma from "../../../infrastructure/prisma.js";
import { Err, Ok } from "ts-results-es";
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../../../domain/model/user.js";

export const userRepo: UserRepo = {
  async create(name, surname, nickName, email, age, role, hashedPassword) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userAlreadyExists !== null)
      return new Err(new UserAlreadyExistsError());

    const user = await prisma.user.create({
      data: {
        name,
        surname,
        nickName,
        email,
        age,
        role,
        password: hashedPassword,
      },
    });
    return new Ok({
      ...user,
      password: undefined,
      completedExercises: [],
    });
  },

  async update(userId, name, surname, nickName, email, age, role) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user === null)
      return new Err(new UserNotFoundError("UserId does not exist"));
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        surname,
        nickName,
        email,
        age,
        role,
      },
      include: {
        completedExercises: {
          where: { user: { id: userId } },
          select: {
            id: true,
            userId: true,
            exerciseId: true,
            date: true,
            duration: true,
          },
        },
      },
    });

    return new Ok({
      ...updatedUser,
      password: undefined,
    });
  },

  async getByEmailWithPassword(email) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        completedExercises: {
          where: { user: { email } },
          select: {
            id: true,
            userId: true,
            exerciseId: true,
            date: true,
            duration: true,
          },
        },
      },
    });
    if (user === null) {
      return new Err(new UserNotFoundError("Email does not exist"));
    }
    return new Ok(user);
  },

  async getAllData(userId) {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        completedExercises: {
          select: {
            id: true,
            userId: true,
            exerciseId: true,
            date: true,
            duration: true,
          },
        },
      },
    });
    if (user === null) {
      return new Err(new UserNotFoundError("UserId does not exist"));
    }
    const userNoPassword: UserEntityNoPassword = {
      ...user,
      password: undefined,
    };
    return new Ok(userNoPassword);
  },

  async getPublicData(userId) {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        name: true,
        nickName: true,
      },
    });
    if (user === null) {
      return new Err(new UserNotFoundError("UserId does not exist"));
    }
    return new Ok(user);
  },

  async getAllDataAll() {
    const users = await prisma.user.findMany({
      include: {
        completedExercises: {
          select: {
            id: true,
            userId: true,
            exerciseId: true,
            date: true,
            duration: true,
          },
        },
      },
    });

    return users.map((user) => ({
      ...user,
      password: undefined,
    }));
  },

  async getPublicDataAll() {
    return await prisma.user.findMany({
      select: {
        name: true,
        nickName: true,
      },
    });
  },

  async addExerciceToCompletedList(exerciseId, userId, date, duration) {
    const exercisePromise = prisma.exercise.findUnique({
      where: { id: exerciseId },
    });
    const userPromise = prisma.user.findUnique({
      where: { id: userId },
    });
    const [exercise, user] = await Promise.all([exercisePromise, userPromise]);
    if (user === null)
      return new Err(new UserNotFoundError("UserId does not exist"));
    if (exercise === null) return new Err(new ExerciseNotFoundError());
    await prisma.completedExercise.create({
      data: {
        exercise: { connect: { id: exerciseId } },
        user: { connect: { id: userId } },
        date,
        duration,
      },
    });
    return new Ok(undefined);
  },
};
