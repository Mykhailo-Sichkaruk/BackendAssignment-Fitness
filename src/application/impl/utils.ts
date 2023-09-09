import crypto from "crypto";

const KEYLEN = 64;
const SALT_LEN = 16;

export const hash = (userPassword: string): string => {
  const salt = crypto.randomBytes(SALT_LEN).toString("hex");
  const hashed = crypto.scryptSync(userPassword, salt, KEYLEN).toString("hex");
  return `${salt}:${hashed}`;
};

export const verify = (userPassword: string, dbHash: string): boolean => {
  try {
    const [salt, dbPassword] = dbHash.split(":");
    const dbPasswordHash = Buffer.from(dbPassword, "hex");
    const userPasswordHash = crypto.scryptSync(userPassword, salt, KEYLEN);
    return crypto.timingSafeEqual(dbPasswordHash, userPasswordHash);
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
