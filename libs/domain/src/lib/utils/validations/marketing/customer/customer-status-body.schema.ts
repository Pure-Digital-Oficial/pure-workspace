import { z } from 'zod';

export const customerStatusBodySchema = z
  .object({
    status: z.string().min(1),
  })
  .strict();
