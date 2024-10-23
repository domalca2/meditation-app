import express from "express";

import publicRouter from "./public/index.mjs";
import privateRouter from "./private/index.mjs";

import debugMiddleware from "./middleware/debug.mjs";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(debugMiddleware);

app.use("/public", publicRouter);
app.use("/private", privateRouter);

app.listen(port, () => {
  console.log(`[CORE] Starting server on ${port}...`);
});
