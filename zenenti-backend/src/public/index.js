import { Router } from "express";

import info from "./info.js";
import user from "./user.js";

const router = Router();

router.use("/info", info);
router.use("/user", user);

export default router;
