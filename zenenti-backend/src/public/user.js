import { Router } from "express";
import db from "../db/db.js";
import validate from "../middleware/validate.js";

const router = Router();

const registerSchema = {
  user_name:  { isString: true },
  email:      { isEmail: true },
  age:        { isInt: true },
  gender:     { isString: true },
  education:  { isString: true },
  profession: { isString: true },
  country:    { isString: true }
};

router.post("/register", validate(registerSchema), async (req, res) => {
  const user = await db.user.create({
    data: req.body
  });

  res.json(user);
});

export default router;
