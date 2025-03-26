import { Body, Controller, Post, Query, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
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
    @Res() response: Response,
    @Query() query: { appId: string },
    @Body() input: Omit<AuthDto, 'appId'>
  ) {
    const result = await this.authService.auth({
      ...input,
      appId: query?.appId ?? '',
    });
    if (result.isRight()) {
      response.cookie('refreshToken', result.value.refreshToken, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
        path: '/auth/refresh',
      });

      return response.json({ accessToken: result.value.accessToken });
    } else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
