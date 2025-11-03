import { z } from 'zod';

export const transactionBodySchema = z
  .object({
    name: z.string().min(1),
    value: z.number().min(0),
    type: z.enum(['WITHDRAW', 'DEPOSIT']),
    categoryId: z.string().min(1),
    initialDate: z.date().optional(),
    finalDate: z.date().optional(),
  })
  .strict();
