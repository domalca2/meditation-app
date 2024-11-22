import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    version: process.env.VERSION,
  });
});

export default router;
