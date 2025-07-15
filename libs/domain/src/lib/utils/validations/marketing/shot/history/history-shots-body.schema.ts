import { z } from 'zod';

export const historyShotsBodySchema = z
  .object({
    shotId: z.string().min(1),
    targetIds: z.array(z.string()).min(1),
  })
  .strict();
