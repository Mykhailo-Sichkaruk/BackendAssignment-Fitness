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

  async addToProgram(exerciseId, programId) {
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

  async removeFromProgram(exerciseId, programId) {
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
