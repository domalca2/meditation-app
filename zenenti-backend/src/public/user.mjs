import { Router } from "express";
import validate from "../middleware/validate.mjs";

const router = Router();

const registerSchema = {
  email: {
    isEmail: true,
  },
};

router.post("/register", validate(registerSchema), (req, res) => {
  res.sendStatus(200);
});

export default router;
