import { z } from 'zod';

export const listUsersBodySchema = z
  .object({
    filters: z
      .object({
        name: z.string().optional(),
        status: z.string().optional(),
      })
      .optional(),
    take: z.coerce.number().optional(),
    skip: z.coerce.number().optional(),
  })
  .strict();
