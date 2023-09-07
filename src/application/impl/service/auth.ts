import type { AuthService } from "../../../domain/service/auth.js";
import type { JWT_PAYLOAD } from "../../../domain/model/auth.js";
import type { ROLE } from "../../../domain/model/user.js";
import env from "../../../config/env.js";
import { Ok } from "ts-results-es";
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
    return new Ok(
      jwt.verify(token, env.ACCESS_TOKEN_SECRET, {
        complete: false,
      }) as JWT_PAYLOAD,
    );
  },

  verifyRefreshToken(token: string) {
    return new Ok(
      jwt.verify(token, env.REFRESH_TOKEN_SECRET, {
        complete: false,
      }) as JWT_PAYLOAD,
    );
  },
};
