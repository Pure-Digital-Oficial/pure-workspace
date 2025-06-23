import { z } from 'zod';

export const editTriggerSchema = z
  .object({
    name: z.string().min(2).max(50),
    content: z.string().min(1),
    description: z.string().min(1),
  })
  .strict();
