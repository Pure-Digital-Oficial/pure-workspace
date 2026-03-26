import { z } from 'zod';

export const createPaymentHistoryBodySchema = z
  .object({
    customerId: z.string(),
    characterId: z.string(),
    planId: z.string(),
    externalId: z.number(),
    amount: z.number(),
  })
  .strict();
