import { z } from 'zod';

export const userIdQuerySchema = z
  .object({
    userId: z.string().min(1),
  })
  .strict();
