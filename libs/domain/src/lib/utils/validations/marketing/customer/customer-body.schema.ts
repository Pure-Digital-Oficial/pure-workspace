import { z } from 'zod';

export const customerBodySchema = z
  .object({
    name: z.string().min(1),
    externalId: z.string().min(1),
    language: z.string().min(1),
  })
  .strict();
