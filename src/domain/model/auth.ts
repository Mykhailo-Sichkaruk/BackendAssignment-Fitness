import type { ROLE, UserId } from "./user.js";

export class TokenInvalidError extends Error {
  name: "TokenInvalidError";
  constructor(message: string | undefined) {
    super("Your token is invalid. " + message);
    this.name = "TokenInvalidError";
  }
}

export type JWT_PAYLOAD = {
  userId: UserId;
  role: ROLE;
};

export type JWTs = {
  accessToken: string;
  refreshToken: string;
};
