import { z } from 'zod';

export const listTransactionsForGraphsBodySchema = z
  .object({
    initialDate: z.coerce.date(),
    finalDate: z.coerce.date(),
  })
  .strict();
