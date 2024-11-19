import { Router } from "express";

import version from "./version.js";
import user from "./user.js";

const router = Router();

router.use("/version", version);
router.use("/user", user);

export default router;
