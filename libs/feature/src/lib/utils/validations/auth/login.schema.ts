import { z } from 'zod';
import { EntityMinLength, entityIsInvalid } from '../../messages';

export const LoginSchema = z
  .object({
    email: z.string().email({ message: entityIsInvalid('Email', 'PT-BR') }),
    password: z.string().min(3, {
      message: EntityMinLength({ entity: 'senha', comparation: 3 }, 'PT-BR'),
    }),
  })
  .required();
