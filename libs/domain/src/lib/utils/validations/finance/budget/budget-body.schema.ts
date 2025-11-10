import { z } from 'zod';

export const budgetBodySchema = z
  .object({
    name: z.string().min(1),
    limitValue: z.number().min(0.01),
    description: z.string().min(1),
  })
  .strict();
