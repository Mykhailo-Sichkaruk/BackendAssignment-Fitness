import { UserWithPassword, registerAndLoginWithRandom } from "./utils.ts";
import assert from "assert";
import {
  ExerciseService,
  Exercise,
  ROLE,
  EXERCISE_DIFFICULTY,
} from "./api/index.ts";

let newAdmin: UserWithPassword;

describe("Exercise", () => {
  before(async () => {
    newAdmin = await registerAndLoginWithRandom(ROLE.ADMIN);
  });

  it("should create, update, get and delete exercise", async () => {
    const exercise = await ExerciseService.createExercise({
      name: "newExercise",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
    });
    assert.strictEqual(typeof exercise.id, "number");
    assert.strictEqual(exercise.name, "newExercise");
    assert.strictEqual(exercise.difficulty, EXERCISE_DIFFICULTY.MEDIUM);

    const updatedExercise = await ExerciseService.updateExercise(exercise.id, {
      name: "updatedExercise",
      difficulty: EXERCISE_DIFFICULTY.HARD,
    });

    assert.strictEqual(typeof updatedExercise.id, "number");
    assert.strictEqual(updatedExercise.name, "updatedExercise");
    assert.strictEqual(updatedExercise.difficulty, EXERCISE_DIFFICULTY.HARD);

    const getExercise = await ExerciseService.getExercise(exercise.id);
    assert.strictEqual(typeof getExercise.id, "number");
    assert.strictEqual(getExercise.name, "updatedExercise");
    assert.strictEqual(getExercise.difficulty, EXERCISE_DIFFICULTY.HARD);

    const deletedExercise = await ExerciseService.deleteExercise(exercise.id);
    assert.strictEqual(deletedExercise, undefined);
  });

  it("should create 5 exercises and get them with search and pagination", async () => {
    const exercises: Exercise[] = [];
    const randomString = Math.random().toString(36).substring(7);
    for (let i = 0; i < 5; i++) {
      exercises.push(
        await ExerciseService.createExercise({
          name: `${randomString}_newExercise${i}`,
          difficulty: EXERCISE_DIFFICULTY.MEDIUM,
        }),
      );
    }
    const exercisesGet = await ExerciseService.getManyExercises(
      `${randomString}_newExercise`,
      1,
      5,
    );
    assert.strictEqual(exercisesGet.length, 5);

    for (let i = 0; i < 5; i++) {
      assert.strictEqual(
        exercisesGet[i].name,
        `${randomString}_newExercise${i}`,
      );
      const deletedExercise = await ExerciseService.deleteExercise(
        exercisesGet[i].id,
      );
      assert.strictEqual(deletedExercise, undefined);
    }
  });
});
