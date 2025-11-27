import { z } from 'zod';

export const listBudgetWithCategoryTransactionsBodySchema = z
  .object({
    filters: z
      .object({
        budgetId: z.string().optional(),
        categoryTransactionId: z.string().optional(),
        name: z.string().optional(),
      })
      .optional(),
    take: z.coerce.number().optional(),
    skip: z.coerce.number().optional(),
  })
  .strict()
  .optional();
