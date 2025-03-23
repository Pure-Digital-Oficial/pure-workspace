import { z } from 'zod';

export const AuthQuerySchema = z
  .object({
    appId: z.string().min(1),
  })
  .strict();
