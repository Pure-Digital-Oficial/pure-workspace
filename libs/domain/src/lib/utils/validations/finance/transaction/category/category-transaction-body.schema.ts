import { z } from 'zod';

export const categoryTransactionBodySchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
  })
  .strict();
