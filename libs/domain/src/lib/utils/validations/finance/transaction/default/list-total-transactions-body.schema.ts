import { z } from 'zod';

export const listTotalTransactionsBodySchema = z
  .object({
    initialDate: z.coerce.date(),
    finalDate: z.coerce.date(),
  })
  .strict()
  .optional();
