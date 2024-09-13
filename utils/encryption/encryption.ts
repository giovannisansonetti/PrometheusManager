import * as crypto from "crypto";
const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

export async function encryptWithKey(text: string, key: string) {
  const buffKey = Buffer.from(key, "hex");
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, buffKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    data: encrypted,
  };
}

export async function decryptWithKey(iv: string, data: string, key: string) {
  const buffKey = Buffer.from(key, "hex");
  const buffIv = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, buffKey, buffIv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
