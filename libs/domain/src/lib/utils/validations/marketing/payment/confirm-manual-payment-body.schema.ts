import { z } from 'zod';

export const confirmManualPaymentBodySchema = z
  .object({
    customerId: z.string(),
    paymentPlataformId: z.string(),
  })
  .strict();
