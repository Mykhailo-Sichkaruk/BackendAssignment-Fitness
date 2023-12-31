import type { ROLE, UserId } from "#domain/model/user.js";
import type {
  JWT_PAYLOAD,
  JWTs,
  TokenInvalidError,
} from "../../domain/model/auth.js";
import type { Result } from "ts-results-es";

export interface AuthService {
  generateTokens(userId: UserId, role: ROLE): JWTs;
  verifyAccessToken(token: string): Result<JWT_PAYLOAD, TokenInvalidError>;
  verifyRefreshToken(token: string): Result<JWT_PAYLOAD, TokenInvalidError>;
}
