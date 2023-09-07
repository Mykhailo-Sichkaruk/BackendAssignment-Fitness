import crypto from "crypto";

export const hash = (password: string): string => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashed = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashed}`;
};

export const verify = (password: string, hash: string): boolean => {
  const [key, salt] = hash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const saltBuffer = Buffer.from(salt, "hex");
  const derivedKey = crypto.scryptSync(password, saltBuffer, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
};
