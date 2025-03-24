import { z } from 'zod';

export const CreateAuthQuerySchema = z
  .object({
    userId: z.string().min(1),
  })
  .strict();
