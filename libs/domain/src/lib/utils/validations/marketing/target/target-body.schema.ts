import { z } from 'zod';

export const targetBodySchema = z
  .object({
    body: z.object({
      content: z.string().min(1),
      triggerId: z.string().min(1),
    }),
  })
  .strict();
