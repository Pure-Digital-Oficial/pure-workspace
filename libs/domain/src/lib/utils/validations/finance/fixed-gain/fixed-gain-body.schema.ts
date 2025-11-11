import { z } from 'zod';

export const fixedGainBodySchema = z
  .object({
    name: z.string().min(1),
    value: z.number(),
    dayOfReceipt: z.number().min(0.01),
    frequency: z.enum(['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'YEARLY']),
  })
  .strict();
