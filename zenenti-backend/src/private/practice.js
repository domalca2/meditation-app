import { Router } from "express";
import validate from "../middleware/validate.js";
import db from "../db/db.js";

const router = Router();

const getAllPracticesSchema = {
  categoryId: {
    isInt: true,
    toInt: true,
    optional: true,
  },
  practiceTypeId: {
    isInt: true,
    toInt: true,
    optional: true,
  },
  order: {
    isIn: {
      options: [["asc", "desc"]],
    },
    default: "asc",
  },
  limit: {
    isInt: true,
    toInt: true,
    optional: true,
  },
};

router.get(
  "/all",
  validate(getAllPracticesSchema, ["query"]),
  async (req, res) => {
    const practices = await db.practice.findMany({
      where: {
        categoryId: req.query.categoryId,
        practiceTypeId: req.query.practiceTypeId,
      },
      orderBy: [
        {
          durationMillis: req.query.order,
        },
      ],
      take: req.query.limit,
    });

    res.json(practices);
  },
);

const getPracticeByIdSchema = {
  id: {
    isInt: true,
    toInt: true,
  },
};

router.get(
  "/:id",
  validate(getPracticeByIdSchema, ["params"]),
  async (req, res) => {
    const practice = await db.practice.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (practice) {
      res.json(practice);
    } else {
      res.sendStatus(404);
    }
  },
);

export default router;
