import { Router } from "express";
import db from "../db/db.js";
import validate from "../middleware/validate.js";

const router = Router();

router.get("/all", async (req, res) => {
  const categories = await db.category.findMany({});

  res.json(categories);
});

const getCategoryByIdSchema = {
  id: {
    isInt: true,
    toInt: true,
  },
};

router.get(
  "/:id",
  validate(getCategoryByIdSchema, ["params"]),
  async (req, res) => {
    const category = await db.category.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (category) {
      res.json(category);
    } else {
      res.sendStatus(404);
    }
  },
);

export default router;
