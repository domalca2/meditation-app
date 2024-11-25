import fs from "node:fs/promises";
import crypto from "node:crypto";

async function getDevSigningKeyPair() {
  await fs.mkdir("secret", { recursive: true });

  try {
    const publicKey = await fs.readFile("secret/signing.public.pem", {
      encoding: "utf-8",
    });
    const privateKey = await fs.readFile("secret/signing.private.pem", {
      encoding: "utf-8",
    });

    return { publicKey, privateKey };
  } catch (e) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: "secp384r1",
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    await fs.writeFile("secret/signing.public.pem", publicKey);
    await fs.writeFile("secret/signing.private.pem", privateKey);

    return { publicKey, privateKey };
  }
}

async function getProdSigningKeyPair() {
  // TODO: Retrieve keys from Azure KeyVault
}

export async function getSigningKeyPair() {
  if (process.env.MODE === "production") {
    return getProdSigningKeyPair();
  } else {
    return getDevSigningKeyPair();
  }
}
