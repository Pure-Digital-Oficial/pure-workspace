import { z } from 'zod';

export const budgetWithCategoryTransactionBodySchema = z
  .object({
    budgetId: z.string().min(1),
    categoryTransactionId: z.string().min(1),
  })
  .strict();
