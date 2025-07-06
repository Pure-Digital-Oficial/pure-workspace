import { z } from 'zod';

export const shotBodySchema = z
  .object({
    modelId: z.string().min(1),
    scheduleDate: z.string().optional(),
    title: z.string().min(1),
  })
  .strict();
