import { randomBytes } from "crypto";

export const generateRandomBase64 = (length: number): string => {
    const randomBytesBuffer = randomBytes(Math.ceil((length * 3) / 4));
    return randomBytesBuffer.toString('base64').slice(0, length);
  }