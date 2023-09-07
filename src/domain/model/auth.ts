import type { ROLE } from "./user.js";

export class TokenInvalidError extends Error {
  constructor(message: string | undefined) {
    super("Your token is invalid. " + message);
  }
}

export type JWT_PAYLOAD = {
  userId: string;
  role: ROLE;
};

export type JWTs = {
  accessToken: string;
  refreshToken: string;
};
