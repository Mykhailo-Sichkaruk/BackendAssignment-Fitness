import { load } from "ts-dotenv";

const env = load({
  APP_HOST: String,
  APP_PORT: String,
  ACCESS_TOKEN_SECRET: String,
  ACCESS_TOKEN_EXPIRATION: String,
  REFRESH_TOKEN_SECRET: String,
  REFRESH_TOKEN_EXPIRATION: String,
  DATABASE_USER: String,
  DATABASE_PASSWORD: String,
  DATABASE_HOST: String,
  DATABASE_PORT: Number,
  DATABASE_NAME: String,
});

export default env;
