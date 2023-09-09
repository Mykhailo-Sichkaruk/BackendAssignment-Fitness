import { ExerciseNotFoundError } from "../../../domain/model/exercise.js";
import type { ExerciseRepo } from "../../../domain/repo/exercise.js";
import prisma from "../../../infrastructure/prisma.js";
import { Err, Ok } from "ts-results-es";

export const exerciseRepo: ExerciseRepo = {
  async create(difficulty, name) {
    return await prisma.exercise.create({
      data: {
        name,
        difficulty,
      },
    });
  },

  async getById(exerciseId) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });

    if (!exercise) return new Err(new ExerciseNotFoundError());
    return new Ok(exercise);
  },

  async getMany(search, page, limit, programId) {
    return await prisma.exercise.findMany({
      where: {
        name: {
          contains: search,
        },
        programs: { some: { id: programId } },
      },
      skip: page && limit ? (page - 1) * limit : 0,
      take: limit,
    });
  },

  async update(exerciseId, name, difficulty) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
    if (!exercise) return new Err(new ExerciseNotFoundError());

    return new Ok(
      await prisma.exercise.update({
        where: {
          id: exerciseId,
        },
        data: {
          name,
          difficulty,
        },
      }),
    );
  },

  async delete(exerciseId) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
    if (!exercise) return new Err(new ExerciseNotFoundError());

    await prisma.exercise.delete({
      where: {
        id: exerciseId,
      },
    });
    return new Ok(undefined);
  },
};
