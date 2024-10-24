import { Router } from "express";

import version from "./version.mjs";
import user from "./user.mjs";

const router = Router();

router.use("/version", version);
router.use("/user", user);

export default router;
