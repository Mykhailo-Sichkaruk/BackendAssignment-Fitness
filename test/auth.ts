import { AuthService, ROLE } from "./api/index.ts";
import { UserWithPassword, createNewRandomUser } from "./utils.ts";
import type { ApiError } from "./api/index.ts";
import assert from "assert";

let newUser: UserWithPassword;

describe("Auth", () => {
  describe("Register", () => {
    it("should return 400 because email string is not valid", async () => {
      const response = await AuthService.register({
        name: "newName",
        surname: "newSurname",
        nickName: "newNickName",
        age: 20,
        password: "password",
        role: ROLE.USER,
        email: "notValidEmail",
      }).catch((err: ApiError) => err);

      assert.strictEqual(response.status, 400);
    });

    it("should return JWTs because new account credentials passed", async () => {
      newUser = createNewRandomUser(ROLE.USER);
      const response = await AuthService.register(newUser);
      assert.strictEqual(typeof response.accessToken, "string");
      assert.strictEqual(typeof response.refreshToken, "string");
    });

    it("should return 400 because email is already taken", async () => {
      const response = await AuthService.register(newUser).catch(
        (err: ApiError) => err,
      );
      assert.strictEqual(response.status, 400);
    });
  });

  describe("Login", () => {
    it("should return 400 because we try to login with not existing account", async () => {
      const response = await AuthService.login({
        email: `notExistingEmail${Math.floor(Math.random() * 1000)}@mail.com`,
        password: "notExistingPassword",
      }).catch((err: ApiError) => err);

      assert.strictEqual(response.status, 400);
    });

    it("should return 400 because we try to login with wrong password", async () => {
      const response = await AuthService.login({
        email: newUser.email,
        password: "wrongPassword",
      }).catch((err: ApiError) => err);

      assert.strictEqual(response.status, 400);
    });

    it("shoud return jwt tokens", async () => {
      const response = await AuthService.login({
        email: newUser.email,
        password: newUser.password,
      });

      assert.strictEqual(typeof response.accessToken, "string");
      assert.strictEqual(typeof response.refreshToken, "string");
    });
  });

  describe("Refresh", () => {
    it("should return 400 because refresh token is not valid", async () => {
      const response = await AuthService.refroshJwt({
        refreshToken: "sadfasdfsad",
      }).catch((err: ApiError) => err);
      assert.strictEqual(response.status, 401);
    });

    it("should return new jwt tokens", async () => {
      const response = await AuthService.login({
        email: newUser.email,
        password: newUser.password,
      });
      const response2 = await AuthService.refroshJwt({
        refreshToken: response.refreshToken,
      });

      assert.strictEqual(typeof response2.accessToken, "string");
    });
  });
});
