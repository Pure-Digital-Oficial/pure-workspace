import { z } from 'zod';

export const UserIdQuerySchema = z
  .object({
    userId: z.string().min(1),
  })
  .strict();
