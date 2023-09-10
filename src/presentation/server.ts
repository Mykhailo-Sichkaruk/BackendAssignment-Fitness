import { StatusCodes as Code, getReasonPhrase } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import openapi from "./openapi.json" assert { type: "json" };
import { gracefulShutdownHandler } from "./utils/utils.js";
import OpenApiValidator from "express-openapi-validator";
import type { ProcessMessage } from "./utils/types.js";
import { ProcessMessagesType } from "./utils/types.js";
import exerciseRouter from "./routes/exercise.js";
import programRouter from "./routes/program.js";
import otherRouter from "./routes/other.js";
import swaggerUi from "swagger-ui-express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import { fileURLToPath } from "node:url";
import env from "../config/env.js";
import express from "express";
import http from "node:http";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/docs/json", express.static(path.join(__dirname, "./openapi.json")));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "./openapi.json"),
    validateResponses: false,
    validateRequests: true,
    validateApiSpec: true,
    ajvFormats: {
      formats: ["int32", "int64", "float", "double", "email"],
      mode: "full",
      keywords: true,
    },
  }),
);

app.use("/program", programRouter);
app.use("/exercise", exerciseRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/other", otherRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (
    (err.status === Code.BAD_REQUEST ||
      err.status === Code.NOT_FOUND ||
      err.status === Code.UNAUTHORIZED) &&
    typeof err?.message === "string"
  ) {
    return res.status(Code.BAD_REQUEST).json({
      message: err.message,
    });
  }

  if (res.headersSent) {
    next(err);
    return;
  }

  console.error(err);
  res.status(Code.INTERNAL_SERVER_ERROR).json({
    message: getReasonPhrase(Code.INTERNAL_SERVER_ERROR),
  });
});

const server = http.createServer(app);

server.listen(env.APP_PORT).on("listening", () => {
  console.log(`Server started at port ${env.APP_PORT}`);
});

process.on("uncaughtException", (error: NodeJS.ErrnoException, origin) => {
  console.error(error, origin);
  void gracefulShutdownHandler(server, "uncaughtException");
});

process.on("message", (message: ProcessMessage) => {
  if (message.status === ProcessMessagesType.FORCE_GRACEFUL_SHUTDOWN) {
    void gracefulShutdownHandler(server, "Forced shutdown");
  }
});
