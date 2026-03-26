import { z } from 'zod';

export const listPaymentMethodsBodySchema = z
  .object({
    filters: z
      .object({
        title: z.string().optional(),
        status: z.string().optional(),
      })
      .optional(),
    take: z.coerce.number().optional(),
    skip: z.coerce.number().optional(),
  })
  .strict();
