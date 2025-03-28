import { Controller, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { ErrorMessageResult } from '@pure-workspace/domain';
import { RefreshTokenService } from './refresh-token.service';

@Controller('auth/refresh-token')
export class RefreshTokenController {
  constructor(private refreshTokenService: RefreshTokenService) {}
  @Post()
  async refresh(@Req() req: Request, @Query() query: { userId: string }) {
    const refreshToken = req.cookies['refreshToken'];

    const result = await this.refreshTokenService.refresh({
      token: refreshToken ?? '',
      userId: query.userId ?? '',
    });
    if (result.isRight()) return { accessToken: result.value.accessToken };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
