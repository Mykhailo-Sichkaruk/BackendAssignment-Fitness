import { registerAndLoginWithRandom } from "./utils.ts";
import {
  ApiError,
  ROLE,
  AdminOnlyService,
  EXERCISE_DIFFICULTY,
} from "./api/index.ts";
import assert from "assert";

describe("Only-admin enpoints ", () => {
  before(async () => {
    await registerAndLoginWithRandom(ROLE.USER);
  });

  it("CreateExercise. should return 403.", async () => {
    const response = await AdminOnlyService.createExercise({
      name: "program",
      difficulty: EXERCISE_DIFFICULTY.HARD,
    }).catch((e: ApiError) => e);
    assert.strictEqual(response.status, 403);
  });

  it("UpdateExercise. Should return 403", async () => {
    const response = await AdminOnlyService.updateExercise(1, {
      name: "program",
      difficulty: EXERCISE_DIFFICULTY.HARD,
    }).catch((e: ApiError) => e);
    assert.strictEqual(response.status, 403);
  });

  it("Delete. Should return 403", async () => {
    const response = await AdminOnlyService.deleteExercise(1).catch(
      (e: ApiError) => e,
    );
    assert.strictEqual(response.status, 403);
  });

  it("CreateProgram. Should return 403", async () => {
    const response = await AdminOnlyService.createProgram({
      name: "program",
      difficulty: EXERCISE_DIFFICULTY.HARD,
    }).catch((e: ApiError) => e);
    assert.strictEqual(response.status, 403);
  });

  it("UpdateProgram. Should return 403", async () => {
    const response = await AdminOnlyService.updateProgram(1, {
      name: "program",
      difficulty: EXERCISE_DIFFICULTY.HARD,
    }).catch((e: ApiError) => e);
    assert.strictEqual(response.status, 403);
  });

  it("DeleteProgram. Should return 403", async () => {
    const response = await AdminOnlyService.deleteProgram(1).catch(
      (e: ApiError) => e,
    );
    assert.strictEqual(response.status, 403);
  });

  it("Add exercise to program. Should return 403", async () => {
    const response = await AdminOnlyService.addExerciseToProgram(1, 1).catch(
      (e: ApiError) => e,
    );
    assert.strictEqual(response.status, 403);
  });

  it("Remove exercise from program. Should return 403", async () => {
    const response = await AdminOnlyService.removeExerciseFromProgram(
      1,
      1,
    ).catch((e: ApiError) => e);
    assert.strictEqual(response.status, 403);
  });
});
