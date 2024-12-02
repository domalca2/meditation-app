import { Router } from "express";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getSigningKeyPair } from "../secret/provider.js";
import passport from "passport";
import db from "../db/db.js";

import user from "./user.js";

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: "accounts.zenenti.com",
  audience: "zenenti.com",
  secretOrKeyProvider: async (request, rawJwtToken, done) => {
    const keyPair = await getSigningKeyPair();

    done(null, keyPair.publicKey);
  },
};
const strategy = new JwtStrategy(strategyOptions, async (jwt_payload, done) => {
  const user = await db.user.findUnique({
    where: { id: Number(jwt_payload.sub) },
  });

  if (!user) {
    done("User does not exist!", null);
  } else {
    done(null, user);
  }
});

passport.use(strategy);

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));
router.use("/user", user);

export default router;
