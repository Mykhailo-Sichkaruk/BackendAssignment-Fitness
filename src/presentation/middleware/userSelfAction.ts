import type { NextFunction, Request, Response } from "express";
import { StatusCodes as Code } from "http-status-codes";
import type { UserId } from "#domain/model/user.js";
import { ROLE } from "#domain/model/user.js";
import { create } from "ts-opaque";
import app from "../context.js";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params as { userId: string };
  const user = await app.getOneUserPrivateData(create<UserId>(Number(userId)));
  if (user.isErr()) {
    return res.status(Code.NOT_FOUND).json({ message: user.error.message });
  }

  if (user.value.id !== req.user?.userId && req.user?.role !== ROLE.ADMIN) {
    return res.status(Code.FORBIDDEN).json({
      message: "You can't update other user's data, unless you are ADMIN",
    });
  }

  next();
};
