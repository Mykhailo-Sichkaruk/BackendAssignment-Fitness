import type { NextFunction, Request, Response } from "express";
import { StatusCodes as Code } from "http-status-codes";
import type { ROLE } from "../../domain/model/user.js";
import verifyAccessToken from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import { Router } from "express";
import app from "../context.js";

const router: Router = Router();

router.use(verifyAccessToken);

router.put(
  "/:userId",
  // TODO: add logic with checking if user is admin or updates his own data
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
        Number(userId),
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
  // TODO: add logic with checking if user is admin or updates his own data
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, exerciseId } = req.params as {
        userId: string;
        exerciseId: string;
      };
      const { date, duration } = req.body as {
        date: Date;
        duration: number;
      };
      const result = await app.completeExercise(
        Number(exerciseId),
        Number(userId),
        date,
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
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params as { userId: string };
      res.json(await app.getOneUserPrivateData(Number(userId)));
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
      res.json(await app.getOneUserPrivateData(Number(userId)));
    } catch (e) {
      next(e);
    }
  },
);

export default router;
