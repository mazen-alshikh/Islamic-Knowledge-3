import { SignJWT, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';

const secretKey = new TextEncoder().encode(
  'your-256-bit-secret'.padEnd(32, '!')
);

export async function generateToken(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .setJti(uuidv4())
    .sign(secretKey);
  
  return token;
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function getJwtSecret() {
  return secretKey;
}