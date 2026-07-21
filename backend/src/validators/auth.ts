import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Password must contain uppercase').regex(/[0-9]/, 'Password must contain number').regex(/[!@#$%^&*]/, 'Password must contain special character'),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  referralCode: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password required')
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/).regex(/[!@#$%^&*]/)
});
