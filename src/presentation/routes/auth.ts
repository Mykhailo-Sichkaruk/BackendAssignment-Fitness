import type { NextFunction, Request, Response } from "express";
import { StatusCodes as Code } from "http-status-codes";
import type { ROLE } from "../../domain/model/user.js";
import { Router } from "express";
import app from "../context.js";

const router: Router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, role, name, nickName, age, surname } =
        req.body as {
          name: string;
          surname: string;
          nickName: string;
          email: string;
          age: number;
          password: string;
          role: ROLE;
        };
      const registerResult = await app.registerJWT(
        name,
        surname,
        nickName,
        email,
        age,
        role,
        password,
      );
      if (registerResult.isErr()) {
        return res
          .status(Code.BAD_REQUEST)
          .json({ error: registerResult.error.message });
      }

      res.json(registerResult.value);
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const loginResult = await app.loginJWT(email, password);
      if (loginResult.isErr()) {
        return res
          .status(Code.BAD_REQUEST)
          .json({ error: loginResult.error.message });
      }

      res.json(loginResult.value);
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body as { refreshToken: string };
      const refreshResult = app.refreshJWT(refreshToken);
      if (refreshResult.isErr()) {
        return res
          .status(Code.UNAUTHORIZED)
          .json({ error: refreshResult.error.message });
      }

      res.json(refreshResult.value);
    } catch (e) {
      next(e);
    }
  },
);

export default router;
