import * as crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export function preview(message: string, length?: number): string {
  return message.length > 15
    ? message.slice(0, length ? length : 20) + '...'
    : message;
}

export function processCarriageReturns(data: string) {
  return data
    .split('\n')
    .map((line) => {
      const carriageReturnIndex = line.lastIndexOf('\r');
      return carriageReturnIndex !== -1
        ? line.substring(carriageReturnIndex + 1)
        : line;
    })
    .join('\n');
}

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY;
const initializeVector = crypto.randomBytes(16);

export function encryptObject(obj: any): string {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey),
    initializeVector,
  );
  let encrypted = cipher.update(JSON.stringify(obj));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${initializeVector.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptObject(encrypted: string): any {
  const [iv, encryptedText] = encrypted
    .split(':')
    .map((part) => Buffer.from(part, 'hex'));
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}

export function isStringArray(obj: unknown): obj is string[] {
  return (
    Array.isArray(obj) && obj.every((element) => typeof element === 'string')
  );
}

export function graphParser(graph: string) {
  const lines = graph.split('\n');
  const graphParsed: object[] = [];
  for (let i = 0; i < lines.length; i += 4) {
    const id = lines[i];
    const parentId = lines[i + 1];
    const message = lines[i + 2];
    const refs = lines[i + 3];
    graphParsed.push({ id, parentId, message, refs });
  }
  return graphParsed;
}
