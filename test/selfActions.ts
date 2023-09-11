import {
  registerAndLoginWithRandom,
  UserWithPassword,
  login,
} from "./utils.ts";
import {
  ROLE,
  UserDataService,
  ExerciseService,
  EXERCISE_DIFFICULTY,
} from "./api/index.ts";
import assert from "assert";

let newUser: UserWithPassword;

describe("Self actions", () => {
  before(async () => {
    newUser = await registerAndLoginWithRandom(ROLE.USER);
  });

  it("should fail to update others private data", async () => {
    const response = await UserDataService.updateUser(1, {
      name: "newName_",
      surname: "newSurname_",
      nickName: "newNickName_",
      age: 21,
    }).catch((err) => err);
    assert.strictEqual(response.status, 403);
  });

  it("should update self private data", async () => {
    const manyUserPublicData = await UserDataService.getManyUsersPublicData(
      newUser.nickName,
    );
    const randomString = Math.random().toString(36).substring(7);
    const response = await UserDataService.updateUser(
      manyUserPublicData[0].id ?? 1,
      {
        name: `newName_${randomString}`,
        surname: `newSurname_${randomString}`,
        nickName: `newNickName_${randomString}`,
        age: 21,
      },
    );

    assert.strictEqual(response.name, `newName_${randomString}`);
    assert.strictEqual(response.surname, `newSurname_${randomString}`);
    assert.strictEqual(response.nickName, `newNickName_${randomString}`);
    assert.strictEqual(response.age, 21);

    newUser.name = response.name;
    newUser.surname = response.surname;
    newUser.nickName = response.nickName;
    newUser.age = response.age;
  });

  it("should fail to get private data of other user", async () => {
    const response = await UserDataService.getOneUserPrivateData(1).catch(
      (err) => err,
    );
    assert.strictEqual(response.status, 403);
  });

  it("should get private data of self", async () => {
    const manyUserPublicData = await UserDataService.getManyUsersPublicData(
      newUser.nickName,
    );
    const response = await UserDataService.getOneUserPrivateData(
      manyUserPublicData[0].id ?? 1,
    );
    assert.strictEqual(response.nickName, newUser.nickName);
  });

  it("should fail to complete exercise of other user", async () => {
    const response = await UserDataService.completeExercise(1, 1, {
      date: String(new Date()),
      duration: 60,
    }).catch((err) => err);
    assert.strictEqual(response.status, 403);
  });

  it("should complete exercise self", async () => {
    const admin = await registerAndLoginWithRandom(ROLE.ADMIN);
    const exercise = await ExerciseService.createExercise({
      name: "exercise",
      difficulty: EXERCISE_DIFFICULTY.EASY,
    }).catch((err) => err);

    await login(newUser.email, newUser.password);
    const me = await UserDataService.getMyPrivateData();
    const response = await UserDataService.completeExercise(
      me.id ?? 1,
      exercise.id,
      {
        date: String(new Date()),
        duration: 60,
      },
    ).catch((err) => err);
    assert.strictEqual(response, undefined);

    await login(admin.email, admin.password);
    await ExerciseService.deleteExercise(exercise.id);
  });

});
