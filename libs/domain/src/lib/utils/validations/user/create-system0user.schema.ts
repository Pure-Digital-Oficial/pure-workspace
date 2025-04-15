import { z } from "zod";

export const createSystemUserSchema = z
  .object({
    appId: z.string(),
    loggedUserId: z.string(),
    body: z.object({
      name: z.string().min(2).max(50),
      nickname: z.string().min(3).max(50),
    }),
  })
