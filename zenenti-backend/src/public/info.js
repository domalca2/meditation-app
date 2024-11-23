import { Router } from "express";
import fs from "node:fs/promises";

const router = Router();

router.get("/", async (req, res) => {
  const backendPackageRaw = await fs.readFile("package.json", {
    encoding: "utf-8",
  });
  const backendPackage = JSON.parse(backendPackageRaw);

  res.json({
    name: "Zenenti Backend",
    version: backendPackage.version,
    mode: process.env.MODE,
  });
});

export default router;
