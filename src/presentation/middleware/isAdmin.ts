import type { NextFunction, Request, Response } from "express";
import { StatusCodes as Code } from "http-status-codes";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.user === null || req.user === undefined) {
    throw new Error(
      "User not found in isAdmin middleware, but it should be called after auth middleware",
    );
  }
  if (req.user.role !== "ADMIN") {
    return res.status(Code.FORBIDDEN).json({
      message: "This endpoint is opened only for users with role: ADMIN",
    });
  }

  next();
};
