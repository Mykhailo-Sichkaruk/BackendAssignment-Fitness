import type { NextFunction, Request, Response } from "express";
import { StatusCodes as Code } from "http-status-codes";
import app from "../context.js";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(Code.UNAUTHORIZED).json({ message: "No token provided" });
  }

  const result = app.authService.verifyAccessToken(token);
  if (result.isErr()) {
    return res
      .status(Code.UNAUTHORIZED)
      .json({ message: result.error.message });
  }
  const user = result.value;
  req.user = user;

  next();
};
