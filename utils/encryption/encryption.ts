import * as crypto from "crypto";
const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;
import { hexToArrayBuffer, arrayBufferToHex } from "./keysmanagement";

/*export async function encryptWithKey(text: string, key: string) {
  const buffKey = Buffer.from(key, "hex");
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, buffKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    data: encrypted,
  };
}*/

export async function decryptWithKey(iv: string, data: string, key: string) {
  const buffKey = Buffer.from(key, "hex");
  const buffIv = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, buffKey, buffIv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export async function encryptWithDerivedKey(data: string, derivedkey: string) {
  const enc = new TextEncoder();
  const dataBuffer = enc.encode(data);

  let iv = window.crypto.getRandomValues(new Uint8Array(16));

  let derivedKeyBuffer = hexToArrayBuffer(derivedkey); // the key is required to be a buffer and not a string

  const key_encoded = await window.crypto.subtle.importKey(
    "raw",
    derivedKeyBuffer,
    "AES-CTR",
    false,
    ["encrypt", "decrypt"],
  );

  const encrypted_content = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter: iv,
      length: 128,
    },
    key_encoded,
    dataBuffer,
  );

  return {
    iv: arrayBufferToHex(iv.buffer),
    data: arrayBufferToHex(encrypted_content),
  };
}
