import { z } from 'zod';

export const listHistoryShotsBodySchema = z
  .object({
    filters: z
      .object({
        status: z.string().optional(),
      })
      .optional(),
    shotId: z.string().min(1),
    take: z.coerce.number().optional(),
    skip: z.coerce.number().optional(),
  })
  .strict();
