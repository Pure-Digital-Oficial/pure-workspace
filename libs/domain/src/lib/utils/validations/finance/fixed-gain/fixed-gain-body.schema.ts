import { z } from 'zod';

export const fixedGainBodySchema = z
  .object({
    name: z.string().min(1),
    value: z.number(),
    dayOfReceipt: z.number(),
    frequency: z.enum(['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'YEARLY']),
  })
  .strict();
