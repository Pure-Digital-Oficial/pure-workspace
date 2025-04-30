import { z } from 'zod';

export const changeUserTypeBodySchema = z
  .object({
    type: z.string().min(1),
  })
  .strict();
