import express from "express";
import db from "./db/db.js";

import publicRouter from "./public/index.js";
import privateRouter from "./private/index.js";

import debugMiddleware from "./middleware/debug.js";

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

process.on("exit", shutdownHandler);
