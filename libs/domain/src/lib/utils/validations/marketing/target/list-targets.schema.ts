import { z } from 'zod';

export const listTargetsBodySchema = z
  .object({
    filters: z
      .object({
        name: z.string().optional(),
        status: z.string().optional(),
      })
      .optional(),
    triggerId: z.string().min(1),
    take: z.coerce.number().optional(),
    skip: z.coerce.number().optional(),
  })
  .strict();
