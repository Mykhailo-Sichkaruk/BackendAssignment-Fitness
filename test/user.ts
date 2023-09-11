import { registerAndLoginWithRandom, UserWithPassword } from "./utils.ts";
import type { User } from "./api/index.ts";
import assert from "assert";
import { UserPublicData, ROLE, UserDataService } from "./api/index.ts";

let newAdmin: UserWithPassword;

describe("User", () => {
  before(async () => {
    newAdmin = await registerAndLoginWithRandom(ROLE.ADMIN);
  });

  it("should get public data of all users, find self", async () => {
    const response = await UserDataService.getManyUsersPublicData();
    assert.strictEqual(
      response.some(
        (user: UserPublicData) => user.nickName === newAdmin.nickName,
      ),
      true,
    );
  });

  it("should get private data of all users, find self", async () => {
    const response = await UserDataService.getManyUsersPrivateData();
    assert.strictEqual(
      response.some((user: User) => user.nickName === newAdmin.nickName),
      true,
    );
  });

  it("should get private data of one user", async () => {
    await UserDataService.getOneUserPrivateData(1);
  });

  it("should get public data of one user", async () => {
    await UserDataService.getOneUserPublicData(1);
  });
});
