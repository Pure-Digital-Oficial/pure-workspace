import { z } from 'zod';

export const changeShotModelInShotBodySchema = z
  .object({
    modelId: z.string().min(1),
  })
  .strict();
