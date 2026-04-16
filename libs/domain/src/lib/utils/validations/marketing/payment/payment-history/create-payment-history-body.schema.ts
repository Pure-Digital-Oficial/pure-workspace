import { z } from 'zod';

export const createPaymentHistoryBodySchema = z
  .object({
    characterId: z.string(),
    planId: z.string(),
    externalId: z.string(),
  })
  .strict();
