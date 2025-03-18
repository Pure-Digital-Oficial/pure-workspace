import { z } from 'zod';

export const queryCreateAuthSchema = z
  .object({
    userId: z.string().min(3),
  })
  .strict();

export const bodyCreateAuthSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3).max(50),
  })
  .strict();
