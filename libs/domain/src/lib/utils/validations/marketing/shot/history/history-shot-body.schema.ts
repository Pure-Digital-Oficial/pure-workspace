import { z } from 'zod';

export const historyShotBodySchema = z
  .object({
    shotId: z.string().min(1),
    targetId: z.string().min(1),
  })
  .strict();
