import type { InternalError } from "../../domain/error.js";
import type { ROLE } from "../../domain/model/user.js";
import type { Result } from "ts-results-es";
import type {
  JWT_PAYLOAD,
  JWTs,
  TokenInvalidError,
} from "../../domain/model/auth.js";

export interface AuthService {
  generateTokens(userId: number, role: ROLE): JWTs;
  verifyAccessToken(
    token: string,
  ): Result<JWT_PAYLOAD, InternalError | TokenInvalidError>;
  verifyRefreshToken(
    token: string,
  ): Result<JWTs, InternalError | TokenInvalidError>;
}
