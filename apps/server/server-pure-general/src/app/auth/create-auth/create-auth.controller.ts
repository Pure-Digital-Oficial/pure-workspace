import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateAuthService } from './create-auth.service';
import {
  CreateAuthQuerySchema,
  CreateAuthDto,
  ErrorMessageResult,
  AuthBodySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';

@Controller('auth/create-auth')
export class CreateAuthController {
  constructor(private createAuthService: CreateAuthService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: CreateAuthQuerySchema,
      body: AuthBodySchema,
    })
  )
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateAuthDto, 'userId'>
  ) {
    const result = await this.createAuthService.create({
      ...input,
      userId: query?.userId ?? '',
    });

    if (result.isRight()) return { auth_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
