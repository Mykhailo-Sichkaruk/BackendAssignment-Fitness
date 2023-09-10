import { userRepo } from "../application/impl/repo/user.js";
import { programRepo } from "../application/impl/repo/program.js";
import { exerciseRepo } from "../application/impl/repo/exercise.js";

import { UserServiceImpl } from "../application/impl/service/user.js";
import { ProgramServiceImpl } from "../application/impl/service/program.js";
import { ExerciseServiceImpl } from "../application/impl/service/exercise.js";
import { AuthServiceImpl } from "../application/impl/service/auth.js";

import { App } from "../application/appServiceImpl.js";

const app = new App(
  new UserServiceImpl(userRepo),
  new ProgramServiceImpl(programRepo),
  new ExerciseServiceImpl(exerciseRepo),
  AuthServiceImpl,
);

export default app;
