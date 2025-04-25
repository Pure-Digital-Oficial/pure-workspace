import { z } from 'zod';

export const deleteUserByIdBodySchema = z
  .object({
    description: z.string().min(1),
  })
  .strict();
