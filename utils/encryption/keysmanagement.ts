export async function deriveKey(
  password: string,
  saltHex: string,
): Promise<string> {
  const salt = hexToArrayBuffer(saltHex);

  // encode password to ArrayBuffer
  const enc = new TextEncoder();
  const passwordBuffer = enc.encode(password);

  // import password as key material

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  // derive bits
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 50000,
      hash: "SHA-256",
    },
    keyMaterial,
    256, // bits
  );

  // convert to hex string
  return arrayBufferToHex(derivedBits);
}

export function hexToArrayBuffer(hexString: string): ArrayBuffer {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
}

export function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256Hex(input: string): Promise<string> {
  // Convert input string to ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // Compute SHA-256 digest
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);

  // Convert ArrayBuffer to hex
  return arrayBufferToHex(hashBuffer);
}
