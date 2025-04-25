import { z } from 'zod';

export const idInParamSchema = z
  .object({
    id: z.string().min(1),
  })
  .strict();
