import { db } from "~/server/db";
import * as crypto from "crypto";

export async function keyGeneration(
  password: string,
  salt: string,
): Promise<string> {
  const saltToBytes = Buffer.from(salt, "hex"); // converts the salt string to bytes
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      saltToBytes,
      50000,
      32,
      "sha256",
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString("hex"));
        }
      },
    );
  });
}

export async function extractPass(userid: string) {
  if (userid) {
    const pass = await db.user.findUnique({
      where: {
        id: userid,
      },
      select: {
        hashed_password: true,
      },
    });
    return pass;
  }
}

export async function extractSalt(userid: string) {
  if (userid) {
    const salt = await db.user.findUnique({
      where: {
        id: userid,
      },
      select: {
        salt: true,
      },
    });
    return salt;
  }
}
