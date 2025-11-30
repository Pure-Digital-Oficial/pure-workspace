import { z } from 'zod';

export const editBudgetWithCategoryTransactionBodySchema = z
  .object({
    budgetId: z.string().min(1),
    categoryTransactionId: z.string().min(1),
    newBudgetId: z.string().min(1).optional(),
    newCategoryTransactionId: z.string().min(1).optional(),
  })
  .strict();
