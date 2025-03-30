import { Controller, Post, Query, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessageResult, UserIdQuerySchema } from '@pure-workspace/domain';
import { RefreshTokenService } from './refresh-token.service';
import { ZodValidationPipe } from '../../pipes';

@Controller('auth/refresh-token')
export class RefreshTokenController {
  constructor(private refreshTokenService: RefreshTokenService) {}
  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: UserIdQuerySchema,
    })
  )
  async refresh(
    @Req() req: Request,
    @Res() response: Response,
    @Query() query: { userId: string }
  ) {
    const refreshToken = req.cookies['refreshToken'];

    const result = await this.refreshTokenService.refresh({
      token: refreshToken ?? '',
      userId: query.userId ?? '',
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
