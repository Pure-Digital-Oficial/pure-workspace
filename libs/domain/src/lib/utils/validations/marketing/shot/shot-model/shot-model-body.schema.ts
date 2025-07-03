import { z } from 'zod';

export const shotModelBodySchema = z
  .object({
    body: z.string().min(1),
    subject: z.string().min(1),
    title: z.string().min(1),
  })
  .strict();
