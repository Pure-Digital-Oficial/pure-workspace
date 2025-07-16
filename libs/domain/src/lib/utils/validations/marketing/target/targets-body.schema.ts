import { z } from 'zod';

export const targetsBodySchema = z
  .object({
    contents: z.array(z.string()).min(1),
    triggerId: z.string().min(1),
    internalStatus: z.string().optional(),
  })
  .strict();
