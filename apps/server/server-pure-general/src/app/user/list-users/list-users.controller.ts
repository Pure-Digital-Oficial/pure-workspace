import { Controller, Get, Query, UsePipes, Body } from '@nestjs/common';
import { ListUsersService } from './list-users.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  ErrorMessageResult,
  listUsersBodySchema,
  ListUsersDto,
  AppIdQuerySchema,
} from '@pure-workspace/domain';

@Controller('list-users')
export class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @UsePipes(
    new ZodValidationPipe({
      query: AppIdQuerySchema,
      body: listUsersBodySchema,
    })
  )
  @Get()
  async list(
    @Query() query: { appId: string },
    @Body() input: Omit<ListUsersDto, 'appId'>
  ) {
    const result = await this.listUsersService.list({
      ...input,
      appId: query.appId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
