import type { ROLE } from "#domain/model/user.js";

export const enum ProcessMessagesType {
  EXITING = "EXITING",
  FORCE_GRACEFUL_SHUTDOWN = "FORCE_GRACEFUL_SHUTDOWN",
}

export type ProcessMessage = {
  status: ProcessMessagesType;
};

declare module "express" {
  interface Request {
    user?: {
      userId: number;
      role: ROLE;
    } | null;
  }
}
