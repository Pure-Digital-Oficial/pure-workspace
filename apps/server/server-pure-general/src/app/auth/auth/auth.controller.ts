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
import { RedisService } from '@pure-workspace/data-access';

@Controller('auth/login')
export class AuthController {
  constructor(
    private authService: AuthService,
    private redisService: RedisService
  ) {}
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
      const { refreshToken, accessToken } = result.value;

      await this.redisService.set(
        'refreshToken',
        refreshToken,
        parseInt(process.env['REDIS_EXPIRATION'] ?? '') ?? 3600
      );

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
        path: '/auth/refresh',
      });

      return response.json({ accessToken });
    } else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
