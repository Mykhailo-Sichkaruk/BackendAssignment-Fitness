import type { AuthService } from "#domain/service/auth.js";
import { TokenInvalidError } from "#domain/model/auth.js";
import type { JWT_PAYLOAD } from "#domain/model/auth.js";
import type { ROLE } from "#domain/model/user.js";
import { Err, Ok } from "ts-results-es";
import env from "#config/env.js";
import jwt from "jsonwebtoken";

export const AuthServiceImpl: AuthService = {
  generateTokens(userId: number, role: ROLE) {
    return {
      accessToken: jwt.sign({ userId, role }, env.ACCESS_TOKEN_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRATION,
      }),
      refreshToken: jwt.sign({ userId, role }, env.REFRESH_TOKEN_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRATION,
      }),
    };
  },

  verifyAccessToken(token: string) {
    try {
      return new Ok(
        jwt.verify(token, env.ACCESS_TOKEN_SECRET, {
          complete: false,
        }) as JWT_PAYLOAD,
      );
    } catch (e) {
      return new Err(new TokenInvalidError("Access token is invalid"));
    }
  },

  verifyRefreshToken(token: string) {
    try {
      return new Ok(
        jwt.verify(token, env.REFRESH_TOKEN_SECRET, {
          complete: false,
        }) as JWT_PAYLOAD,
      );
    } catch (e) {
      return new Err(new TokenInvalidError("Refresh token is invalid"));
    }
  },
};
