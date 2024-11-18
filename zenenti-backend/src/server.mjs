import express from "express";
import db from "./db/db.mjs";

import publicRouter from "./public/index.mjs";
import privateRouter from "./private/index.mjs";

import debugMiddleware from "./middleware/debug.mjs";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(debugMiddleware);

app.use("/public", publicRouter);
app.use("/private", privateRouter);

const server = app.listen(port, () => {
  console.log(`[CORE] Starting server on ${port}...`);
});

async function shutdownHandler() {
  console.log("[CORE] Gracefully shutting down...");

  console.log("[CORE] Closing database connection...");
  await db.$disconnect();

  console.log("[CORE] Shutting down HTTP server...");
  await server.close();

  process.exit(0);
}

process.on("SIGINT", shutdownHandler);
process.on("SIGTERM", shutdownHandler);
process.on("SIGQUIT", shutdownHandler);
process.on("SIGKILL", shutdownHandler);
process.on("exit", shutdownHandler);
