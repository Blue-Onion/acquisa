import z from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().toLowerCase().min(5).max(255),
  password: z.string().min(6).max(100),
  enum: z.enum(['user', 'admin']).default('user'),
});
export const signInSchema = z.object({
  email: z.string().toLowerCase().min(5).max(255),
  password: z.string().min(6).max(100),
});
