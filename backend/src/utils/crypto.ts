import { hash, verify } from 'argon2';
import crypto from 'crypto';
import { config } from '../config/env.js';

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, {
    type: 2, // argon2id
    memoryCost: config.ARGON2_MEMORY,
    timeCost: config.ARGON2_ITERATIONS,
    parallelism: config.ARGON2_PARALLELISM
  });
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await verify(hashedPassword, password);
  } catch {
    return false;
  }
};

export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateReferralCode = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

export const encryptString = (text: string): string => {
  const cipher = crypto.createCipher('aes192', process.env.JWT_SECRET || 'default');
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decryptString = (encrypted: string): string => {
  const decipher = crypto.createDecipher('aes192', process.env.JWT_SECRET || 'default');
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
