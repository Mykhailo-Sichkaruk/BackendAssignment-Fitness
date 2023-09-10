import { ExerciseNotFoundError } from "#domain/model/exercise.js";
import type { UserRepo } from "#domain/repo/user.js";
import prisma from "#infrastructure/prisma.js";
import type {
  UserEntity,
  UserEntityNoPassword,
  UserEntityPublicData,
  UserId,
} from "#domain/model/user.js";
import { Err, Ok } from "ts-results-es";
import { create } from "ts-opaque";
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from "#domain/model/user.js";

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
      id: create<UserId>(user.id),
      password: undefined,
      completedExercises: [],
    });
  },

  async update(userId, name, surname, nickName, age, role) {
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
    } as UserEntityNoPassword);
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
    return new Ok(user as UserEntity);
  },

  async getOnePrivateData(userId) {
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
    } as UserEntityNoPassword;
    return new Ok(userNoPassword);
  },

  async getOnePublicData(userId) {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        nickName: true,
      },
    });
    if (user === null) {
      return new Err(new UserNotFoundError("UserId does not exist"));
    }

    return new Ok(user as UserEntityPublicData);
  },

  async getManyPrivateData(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ) {
    const users = await prisma.user.findMany({
      where: { nickName: { contains: searchNick } },
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
      skip: page && limit && page >= 0 ? (page - 1) * limit : undefined,
      take: limit && limit <= 0 ? undefined : limit,
    });

    return users.map((user) => ({
      ...user,
      password: undefined,
    })) as UserEntityNoPassword[];
  },

  async getManyPublicData(
    searchNick: string | undefined,
    page: number | undefined,
    limit: number | undefined,
  ) {
    return (await prisma.user.findMany({
      where: { nickName: { contains: searchNick } },
      select: {
        id: true,
        nickName: true,
      },
      skip: page && limit && page >= 0 ? (page - 1) * limit : undefined,
      take: limit && limit <= 0 ? undefined : limit,
    })) as UserEntityPublicData[];
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
