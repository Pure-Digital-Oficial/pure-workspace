import { z } from 'zod';

export const deleteTargetsBodySchema = z
  .object({
    ids: z.array(z.string()).min(1),
  })
  .strict();
