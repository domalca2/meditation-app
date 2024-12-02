import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
  });
});

export default router;
