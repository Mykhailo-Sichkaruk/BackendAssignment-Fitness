import type { ProcessMessage } from "./types.js";
import { ProcessMessagesType } from "./types.js";
import { setTimeout } from "node:timers/promises";
import process from "node:process";

export const enum MessageType {
  Auth = "auth",
  AuthResponse = "auth-response",
  GoogleAuthStart = "google-auth-start",
}

export const gracefulShutdownHandler = async (
  server: { close: () => void },
  reason: string,
) => {
  console.log(`Graceful shutdown: ${reason}`);

  try {
    if (process.send) {
      const msg: ProcessMessage = { status: ProcessMessagesType.EXITING };
      process.send(msg);
    } else {
      throw new Error("Process is not a child process");
    }
    await setTimeout(1000);

    server.close();
    console.warn("Close server, exit process successfully");
    process.exit(0);
  } catch (error: any) {
    console.warn(error, "Close server, exit process with error");
    process.exit(1);
  }
};
