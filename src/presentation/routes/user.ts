import type { NextFunction, Request, Response } from "express";
import userSelfAction from "../middleware/userSelfAction.js";
import type { ExerciseId } from "#domain/model/exercise.js";
import { StatusCodes as Code } from "http-status-codes";
import verifyAccessToken from "../middleware/auth.js";
import type { UserId } from "#domain/model/user.js";
import isAdmin from "../middleware/isAdmin.js";
import { ROLE } from "#domain/model/user.js";
import { create } from "ts-opaque";
import { Router } from "express";
import app from "../context.js";

const router: Router = Router();

router.use(verifyAccessToken);

router.put(
  "/:userId",
  userSelfAction,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params as { userId: string };
      const { name, surname, nickName, age, role } = req.body as {
        name: string | undefined;
        surname: string | undefined;
        nickName: string | undefined;
        age: number | undefined;
        role: ROLE | undefined;
      };
      const result = await app.updateUser(
        create<UserId>(Number(userId)),
        name,
        surname,
        nickName,
        age,
        role,
      );
      if (result.isErr()) {
        return res
          .status(Code.NOT_FOUND)
          .json({ message: result.error.message });
      }

      res.json(result.value);
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  "/:userId/completeExercise/:exerciseId",
  userSelfAction,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, exerciseId } = req.params as {
        userId: string;
        exerciseId: string;
      };
      const { date, duration } = req.body as {
        date: string;
        duration: number;
      };
      const result = await app.completeExercise(
        create<ExerciseId>(Number(exerciseId)),
        create<UserId>(Number(userId)),
        new Date(date),
        duration,
      );
      if (result.isErr()) {
        return res
          .status(Code.NOT_FOUND)
          .json({ message: result.error.message });
      }

      res.json(result.value);
    } catch (e) {
      next(e);
    }
  },
);

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.userId === undefined) {
      return res.status(Code.NOT_FOUND).json({ message: "User not found" });
    }
    const user = await app.getOneUserPrivateData(
      create<UserId>(Number(req.user.userId)),
    );
    if (user.isErr()) {
      return res.status(Code.NOT_FOUND).json({ message: user.error.message });
    }

    res.json(user.value);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/publicData",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { searchNick, page, limit } = req.query as {
        searchNick: string | undefined;
        page: number | undefined;
        limit: number | undefined;
      };
      if (Boolean(page) !== Boolean(limit)) {
        return res
          .status(Code.BAD_REQUEST)
          .json({ message: "Page and limit must be together or not at all" });
      }
      res.json(await app.getManyUsersPublicData(searchNick, page, limit));
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  "/privateData",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { searchNick, page, limit } = req.query as {
        searchNick: string | undefined;
        page: string | undefined;
        limit: string | undefined;
      };
      if (Boolean(page) !== Boolean(limit)) {
        return res
          .status(Code.BAD_REQUEST)
          .json({ message: "Page and limit must be together or not at all" });
      }
      res.json(
        await app.getManyUsersPrivateData(
          searchNick,
          page === undefined ? undefined : Number(page),
          limit === undefined ? undefined : Number(limit),
        ),
      );
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  "/:userId/privateData",
  userSelfAction,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params as { userId: string };
      const user = await app.getOneUserPrivateData(
        create<UserId>(Number(userId)),
      );
      if (user.isErr()) {
        return res.status(Code.NOT_FOUND).json({ message: user.error.message });
      }

      if (user.value.id !== req.user?.userId && req.user?.role !== ROLE.ADMIN) {
        return res.status(Code.FORBIDDEN).json({
          message: "You can't update other user's data, unless you are ADMIN",
        });
      }

      res.json(user.value);
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  "/:userId/publicData",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params as { userId: string };
      res.json(await app.getOneUserPublicData(create<UserId>(Number(userId))));
    } catch (e) {
      next(e);
    }
  },
);

export default router;
