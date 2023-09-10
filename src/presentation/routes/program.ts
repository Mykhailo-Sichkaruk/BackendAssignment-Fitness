import type { NextFunction, Request, Response } from "express";
import type { ProgramId } from "../../domain/model/program.js";
import { StatusCodes as Code } from "http-status-codes";
import verifyAccessToken from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import type {
  EXERCISE_DIFFICULTY,
  ExerciseId,
} from "../../domain/model/exercise.js";
import { create } from "ts-opaque";
import { Router } from "express";
import app from "../context.js";

const router: Router = Router();

router.use(verifyAccessToken);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, page, limit } = req.query as {
      search: string | undefined;
      page: string | undefined;
      limit: string | undefined;
    };
    if (Boolean(page) !== Boolean(limit)) {
      return res
        .status(Code.BAD_REQUEST)
        .json({ message: "Page and limit must be together or not at all" });
    }
    res.json(
      await app.getManyPrograms(
        search,
        page === undefined ? undefined : Number(page),
        limit === undefined ? undefined : Number(limit),
      ),
    );
  } catch (e) {
    next(e);
  }
});

router.get(
  "/:programId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { programId } = req.params as { programId: string };
      const result = await app.getProgramById(
        create<ProgramId>(Number(programId)),
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

router.post(
  "",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, difficulty } = req.body as {
        name: string;
        difficulty: EXERCISE_DIFFICULTY;
      };
      return res.json(await app.createProgram(name, difficulty));
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  "/:programId",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { programId } = req.params as { programId: string };
      const { name, difficulty } = req.body as {
        name: string;
        difficulty: EXERCISE_DIFFICULTY;
      };

      const updateResult = await app.updateProgram(
        create<ProgramId>(Number(programId)),
        name,
        difficulty,
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
  "/:programId",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { programId } = req.params as { programId: string };
      const deleteResult = await app.deleteProgram(
        create<ProgramId>(Number(programId)),
      );
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

router.put(
  "/:programId/exercise/:exerciseId",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { programId, exerciseId } = req.params as {
        programId: string;
        exerciseId: string;
      };
      const result = await app.addExerciceToProgram(
        create<ExerciseId>(Number(exerciseId)),
        create<ProgramId>(Number(programId)),
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

router.delete(
  "/:programId/exercise/:exerciseId",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { programId, exerciseId } = req.params as {
        programId: string;
        exerciseId: string;
      };
      const result = await app.removeExerciceFromProgram(
        create<ExerciseId>(Number(exerciseId)),
        create<ProgramId>(Number(programId)),
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

export default router;
