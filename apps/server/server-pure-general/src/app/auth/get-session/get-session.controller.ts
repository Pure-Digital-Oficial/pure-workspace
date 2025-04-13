import { Controller, Get, Query, Req, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { GetSessionService } from './get-session.service';
import {
  AppIdQuerySchema,
  ErrorMessageResult,
  ExtractTokenFromHeader,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';

@Controller('auth/session')
export class GetSessionController {
  constructor(private getSessionService: GetSessionService) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe({
      query: AppIdQuerySchema,
    })
  )
  async create(@Query() query: { appId: string }, @Req() request: Request) {
    const token = ExtractTokenFromHeader(request);

    const result = await this.getSessionService.get({
      accessToken: token ?? '',
      appId: query.appId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
