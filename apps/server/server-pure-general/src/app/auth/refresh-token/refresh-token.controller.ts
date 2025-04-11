import { Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessageResult, UserIdQuerySchema } from '@pure-workspace/domain';
import { RefreshTokenService } from './refresh-token.service';
import { ZodValidationPipe } from '../../pipes';
import { RedisService } from '@pure-workspace/data-access';

@Controller('auth/refresh-token')
export class RefreshTokenController {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private redisService: RedisService
  ) {}
  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: UserIdQuerySchema,
    })
  )
  async refresh(@Req() req: Request, @Res() response: Response) {
    const refreshToken = req.cookies['refreshToken'];

    const cachedRefreshToken = await this.redisService.get('refreshToken');

    const result = await this.refreshTokenService.refresh({
      token: refreshToken ?? '',
      refreshToken: cachedRefreshToken ?? '',
    });

    if (result.isRight()) {
      await this.redisService.set(
        'refreshToken',
        result.value.refreshToken,
        parseInt(process.env['REDIS_EXPIRATION'] ?? '') ?? 3600
      );

      return response.json(result.value);
    } else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
