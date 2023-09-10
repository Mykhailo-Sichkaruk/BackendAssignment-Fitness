import { StatusCodes as Code, getReasonPhrase } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import env from "../../config/env.js";
import { Router } from "express";

const router: Router = Router();

router.get(
  "/internalError",
  async (_req: Request, _res: Response, next: NextFunction) => {
    try {
      throw new Error(
        `Internal error that nobody expected. Secrects leaked: ${env.ACCESS_TOKEN_SECRET}`,
      );
    } catch (error: any) {
      next(error);
    }
  },
);

router.get("/makeCoffee", async (_req: Request, res: Response) => {
  res
    .status(Code.IM_A_TEAPOT)
    .json({ message: getReasonPhrase(Code.IM_A_TEAPOT) });
});

export default router;
