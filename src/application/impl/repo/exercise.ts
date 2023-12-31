import { ExerciseNotFoundError } from "#domain/model/exercise.js";
import type { ExerciseEntity } from "#domain/model/exercise.js";
import type { ExerciseRepo } from "#domain/repo/exercise.js";
import prisma from "#infrastructure/prisma.js";
import { Err, Ok } from "ts-results-es";

export const exerciseRepo: ExerciseRepo = {
  async create(difficulty, name) {
    return (await prisma.exercise.create({
      data: {
        name,
        difficulty,
      },
    })) as ExerciseEntity;
  },

  async getById(exerciseId) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });

    if (!exercise) return new Err(new ExerciseNotFoundError());
    return new Ok(exercise as ExerciseEntity);
  },

  async getMany(search, page, limit, programId) {
    return (await prisma.exercise.findMany({
      where: {
        name: {
          contains: search,
        },
        ...(programId
          ? {
              programs: {
                some: { id: programId },
              },
            }
          : {}),
      },
      skip: page && limit && page > 0 ? (page - 1) * limit : undefined,
      take: limit && limit < 0 ? undefined : limit,
    })) as ExerciseEntity[];
  },

  async update(exerciseId, name, difficulty) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
    if (!exercise) return new Err(new ExerciseNotFoundError());

    return new Ok(
      (await prisma.exercise.update({
        where: {
          id: exerciseId,
        },
        data: {
          name,
          difficulty,
        },
      })) as ExerciseEntity,
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
