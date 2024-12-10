import { Router } from "express";
import db from "../db/db.js";
import validate from "../middleware/validate.js";

const router = Router();

router.get("/all", async (req, res) => {
  const practiceTypes = await db.practiceType.findMany({
    orderBy: {
      id: "asc",
    },
  });

  res.json(practiceTypes);
});

const getPracticeTypeByIdSchema = {
  id: {
    isInt: true,
    toInt: true,
  },
};

router.get(
  "/:id",
  validate(getPracticeTypeByIdSchema, ["params"]),
  async (req, res) => {
    const practiceType = await db.practiceType.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (practiceType) {
      res.json(practiceType);
    } else {
      res.sendStatus(404);
    }
  },
);

export default router;
