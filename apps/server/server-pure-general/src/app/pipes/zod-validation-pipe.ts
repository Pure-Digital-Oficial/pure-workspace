import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schemas: Record<string, z.ZodTypeAny>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const key = metadata.type; // 'body', 'query', etc.
    const schema = this.schemas[key];

    if (!schema) {
      return value; // If no schema is found, return the value without validation
    }

    try {
      return schema.parse(value);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException(e.errors);
      }
      throw e;
    }
  }
}
