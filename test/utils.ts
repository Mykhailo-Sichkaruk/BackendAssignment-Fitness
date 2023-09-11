import { OpenAPI, ROLE, AuthService } from "./api/index.ts";

OpenAPI.BASE = "http://localhost:3000";

export type UserWithPassword = {
  name: string;
  surname: string;
  nickName: string;
  age: number;
  email: string;
  password: string;
  role: ROLE;
};

export const createNewRandomUser = (role: ROLE): UserWithPassword => {
  const randomString = Math.random().toString(36).substring(0, 10);
  const name = "new" + role + randomString;
  return {
    name: name,
    surname: name,
    nickName: name,
    age: 20,
    email: name + "@mail.com",
    password: "password",
    role,
  };
};

export const login = async (email: string, password: string) => {
  const response = await AuthService.login({
    email: email,
    password: password,
  }).catch((err: any) => err);
  OpenAPI.TOKEN = response.accessToken;
};

export const registerAndLoginWithRandom = async (role: ROLE) => {
  const newUser = createNewRandomUser(role);
  await AuthService.register(newUser);
  await login(newUser.email, newUser.password);
  return newUser;
};
