import {
  UserWithPassword,
  login,
  registerAndLoginWithRandom,
} from "./utils.ts";
import type { ApiError } from "./api/index.ts";
import assert from "assert";
import {
  ProgramService,
  OpenAPI,
  ROLE,
  Exercise,
  ExerciseService,
  EXERCISE_DIFFICULTY,
} from "./api/index.ts";

let newAdmin: UserWithPassword;

describe("Program", () => {
  before(async () => {
    newAdmin = await registerAndLoginWithRandom(ROLE.ADMIN);
  });

  it("should return 401 because we try to create program with not existing user", async () => {
    OpenAPI.TOKEN = "notExistingToken";
    const response = await ProgramService.createProgram({
      name: "newProgram",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
    }).catch((err: ApiError) => err);

    assert.strictEqual(response.status, 401);
    await login(newAdmin.email, newAdmin.password);
  });

  it("should check deletion of program", async () => {
    const program = await ProgramService.createProgram({
      name: "newProgram",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
    });

    const programDeleted = await ProgramService.deleteProgram(program.id);
    assert.strictEqual(programDeleted, undefined);

    const programGet = await ProgramService.getProgram(program.id).catch(
      (err: ApiError) => err,
    );
    assert.strictEqual(programGet.status, 404);
  });

  it("should create, update, get and delete program", async () => {
    // Create
    const program = await ProgramService.createProgram({
      name: "newProgram",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
    });

    // Update
    const programUpdated = await ProgramService.updateProgram(program.id, {
      name: "newProgram2",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
    });
    assert.strictEqual(programUpdated.name, "newProgram2");

    // Get
    const programGet = await ProgramService.getProgram(program.id);
    assert.strictEqual(programGet.name, "newProgram2");
    assert.strictEqual(programGet.difficulty, EXERCISE_DIFFICULTY.MEDIUM);

    // Delete
    const programDeleted = await ProgramService.deleteProgram(program.id);
    assert.strictEqual(programDeleted, undefined);
  });

  it("should create program and 5 exercises and add them to program, finally delete", async () => {
    const program = await ProgramService.createProgram({
      name: "newProgram",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
    });

    const exercises: Exercise[] = [];
    for (let i = 0; i < 5; i++) {
      exercises.push(
        await ExerciseService.createExercise({
          name: `newExercise${i}`,
          difficulty: EXERCISE_DIFFICULTY.MEDIUM,
        }),
      );
    }

    for (const exercise of exercises) {
      await ProgramService.addExerciseToProgram(program.id, exercise.id);
    }

    const programGet = await ProgramService.getProgram(program.id);
    assert.strictEqual(programGet.exercises.length, 5);
    assert.strictEqual(programGet.exercises[0].name, "newExercise0");

    const deletedProgram = await ProgramService.deleteProgram(program.id);
    assert.strictEqual(deletedProgram, undefined);
    for (const exercise of exercises) {
      const deleteExercise = await ExerciseService.deleteExercise(exercise.id);
      assert.strictEqual(deleteExercise, undefined);
    }
  });

  it("should create 5 programs and get them with pagination", async () => {
    const programs: any[] = [];
    for (let i = 0; i < 5; i++) {
      programs.push(
        await ProgramService.createProgram({
          name: `newProgram${i}`,
          difficulty: EXERCISE_DIFFICULTY.MEDIUM,
        }),
      );
    }

    const programsGet = await ProgramService.getManyPrograms(
      "newProgram",
      1,
      2,
    );
    assert.strictEqual(programsGet.length, 2);
    assert.strictEqual(programsGet[0].name, "newProgram0");
    assert.strictEqual(programsGet[1].name, "newProgram1");

    for (const program of programs) {
      await ProgramService.deleteProgram(program.id);
    }
  });
});
