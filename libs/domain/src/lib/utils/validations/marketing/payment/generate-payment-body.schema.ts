import { z } from 'zod';

export const generatePaymentBodySchema = z
  .object({
    paymentPlataformId: z.string(),
    paymentMethodId: z.string(),
    planId: z.string(),
    payerEmail: z.string(),
  })
  .strict();
