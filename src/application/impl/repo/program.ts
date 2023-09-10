import { ExerciseNotFoundError } from "../../../domain/model/exercise.js";
import { ProgramNotFoundError } from "../../../domain/model/program.js";
import type { ProgramRepo } from "../../../domain/repo/program.js";
import prisma from "../../../infrastructure/prisma.js";
import { Err, Ok } from "ts-results-es";

export const programRepo: ProgramRepo = {
  async create(name, difficulty) {
    return await prisma.program.create({
      data: {
        name,
        difficulty,
      },
      include: {
        exercises: true,
      },
    });
  },

  async getById(programId) {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
      include: {
        exercises: true,
      },
    });
    if (!program) return new Err(new ProgramNotFoundError());

    return new Ok(program);
  },

  async getMany(search, page, limit) {
    const programs = await prisma.program.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      include: {
        exercises: true,
      },
      skip: page && limit && page >= 0 ? (page - 1) * limit : undefined,
      take: limit && limit <= 0 ? undefined : limit,
    });

    return programs;
  },

  async update(programId, name, difficulty) {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
    });
    if (!program) return new Err(new ProgramNotFoundError());

    return new Ok(
      await prisma.program.update({
        where: {
          id: programId,
        },
        data: {
          name,
          difficulty,
        },
        include: {
          exercises: true,
        },
      }),
    );
  },

  async delete(programId) {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
    });
    if (!program) return new Err(new ProgramNotFoundError());

    await prisma.program.delete({
      where: {
        id: programId,
      },
    });

    return new Ok(undefined);
  },

  async addExercise(exerciseId, programId) {
    const exercisePromise = prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
    const programPromise = prisma.program.findUnique({
      where: {
        id: programId,
      },
    });
    const [program, exercise] = await Promise.all([
      programPromise,
      exercisePromise,
    ]);
    if (!exercise) return new Err(new ExerciseNotFoundError());
    if (!program) return new Err(new ProgramNotFoundError());

    await prisma.program.update({
      where: {
        id: programId,
      },
      data: {
        exercises: {
          connect: {
            id: exerciseId,
          },
        },
      },
    });
    return new Ok(undefined);
  },

  async removeExervice(exerciseId, programId) {
    const exercisePromise = prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
    const programPromise = prisma.program.findUnique({
      where: {
        id: programId,
      },
    });
    const [program, exercise] = await Promise.all([
      programPromise,
      exercisePromise,
    ]);
    if (!exercise) return new Err(new ExerciseNotFoundError());
    if (!program) return new Err(new ProgramNotFoundError());

    await prisma.program.update({
      where: {
        id: programId,
      },
      data: {
        exercises: {
          disconnect: {
            id: exerciseId,
          },
        },
      },
    });

    return new Ok(undefined);
  },
};
