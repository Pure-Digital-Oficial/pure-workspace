import { z } from 'zod';

export const changeTargetsTriggerBodySchema = z
  .object({
    triggerId: z.string().min(1),
    targetsIds: z.array(z.string()),
  })
  .strict();
