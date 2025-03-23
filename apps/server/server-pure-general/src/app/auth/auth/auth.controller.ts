import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import {
  AuthBodySchema,
  AuthDto,
  AuthQuerySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../../pipes';

@Controller('auth/login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: AuthQuerySchema,
      body: AuthBodySchema,
    })
  )
  async auth(
    @Query() query: { appId: string },
    @Body() input: Omit<AuthDto, 'appId'>
  ) {
    const result = await this.authService.auth({
      ...input,
      appId: query?.appId ?? '',
    });
    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
