import { db } from "~/server/db";
import * as crypto from "crypto";

export async function keyGeneration(password: string, salt: string) {
  const saltToBytes = Buffer.from(salt, "hex");
  const key = crypto.pbkdf2(password, saltToBytes, 50000, 32, "sha256");
}

export async function extractPass(userid: string) {
  await db.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      hashed_password: true,
    },
  });
}
