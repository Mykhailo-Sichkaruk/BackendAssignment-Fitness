import type { EXERCISE_DIFFICULTY } from "../../domain/model/exercise.js";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes as Code } from "http-status-codes";
import verifyAccessToken from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import { Router } from "express";
import app from "../context.js";

const router: Router = Router();

router.use(verifyAccessToken);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, page, limit, programId } = req.query as {
      search: string | undefined;
      page: string | undefined;
      limit: string | undefined;
      programId: string | undefined;
    };
    if (Boolean(page) !== Boolean(limit)) {
      return res
        .status(Code.BAD_REQUEST)
        .json({ message: "Page and limit must be together or not at all" });
    }
    res.json(
      await app.getManyExercices(
        search,
        page === undefined ? undefined : Number(page),
        limit === undefined ? undefined : Number(limit),
        programId === undefined ? undefined : Number(programId),
      ),
    );
  } catch (e) {
    next(e);
  }
});

router.get(
  "/:exerciseId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { exerciseId } = req.params as { exerciseId: string };
      const result = await app.getExerciceById(Number(exerciseId));
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

router.post(
  "",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, difficulty } = req.body as {
        name: string;
        difficulty: EXERCISE_DIFFICULTY;
      };
      const exercise = await app.createExercice(difficulty, name);
      return res.json(exercise);
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  "/:exerciseId",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { exerciseId } = req.params as { exerciseId: string };
      const { name, difficulty } = req.body as {
        name: string;
        difficulty: EXERCISE_DIFFICULTY;
      };

      const updateResult = await app.updateExercice(
        Number(exerciseId),
        difficulty,
        name,
      );
      if (updateResult.isErr()) {
        return res
          .status(Code.NOT_FOUND)
          .json({ message: updateResult.error.message });
      }

      res.json(updateResult.value);
    } catch (e) {
      next(e);
    }
  },
);

router.delete(
  "/:exerciseId",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { exerciseId } = req.params as { exerciseId: string };
      const deleteResult = await app.deleteExercice(Number(exerciseId));
      if (deleteResult.isErr()) {
        return res
          .status(Code.NOT_FOUND)
          .json({ message: deleteResult.error.message });
      }

      res.json(deleteResult.value);
    } catch (e) {
      next(e);
    }
  },
);

export default router;
