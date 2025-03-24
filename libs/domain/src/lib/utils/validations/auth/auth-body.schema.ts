import { z } from 'zod';

export const AuthBodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3).max(50),
  })
  .strict();
