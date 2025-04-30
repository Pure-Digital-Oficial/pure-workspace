import { z } from 'zod';

export const editUserProfileBodySchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(2).max(50),
    picture: z.string().optional(),
    birthDate: z.string().optional(),
    email: z.string().email(),
  })
  .strict();
