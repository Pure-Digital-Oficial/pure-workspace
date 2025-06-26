import { z } from 'zod';

export const editUserBodySchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(2).max(50),
    picture: z.string().optional(),
    status: z.string().min(1),
  })
  .strict();
