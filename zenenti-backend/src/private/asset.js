import { Router } from "express";

const router = Router();

router.get("/*", async (req, res) => {
  res.download(req.params[0], null, {
    root: "./assets",
  });
});

export default router;
