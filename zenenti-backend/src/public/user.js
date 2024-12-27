import { Router } from "express";
import db from "../db/db.js";
import validate from "../middleware/validate.js";
import { getSigningKeyPair } from "../secret/provider.js";
import jwt from "jsonwebtoken";

const router = Router();

async function generateUserAuthToken(user) {
  const keyPair = await getSigningKeyPair();

  return jwt.sign({}, keyPair.privateKey, {
    algorithm: "ES384",
    audience: "zenenti.com",
    issuer: "accounts.zenenti.com",
    subject: `${user.id}`,
    expiresIn: "30 days",
  });
}

const registerBeginSchema = {
  name: { isString: true },
};

router.post(
  "/register-begin",
  validate(registerBeginSchema),
  async (req, res) => {
    console.log("Solicitud recibida en /register-begin:", req.method, req.headers, req.body);
    const user = await db.user.create({
      data: {
        name: req.body.name,
        joinDate: new Date(),
      },
    });
    console.log('usuario ',req.body.name);
    const token = await generateUserAuthToken(user);

    res.json({ token });
  },
);

export default router;
