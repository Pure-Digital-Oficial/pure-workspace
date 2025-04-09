import { z } from 'zod';

export const AppIdQuerySchema = z
  .object({
    appId: z.string().min(1),
  })
  .strict();
