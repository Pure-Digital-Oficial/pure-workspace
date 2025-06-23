import {
  Controller,
  Get,
  Query,
  UsePipes,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ListTriggersService } from './list-triggers.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListTriggersDto,
  listTriggersBodySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('list-triggers')
export class ListTriggersController {
  constructor(private readonly listTriggersService: ListTriggersService) {}

  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listTriggersBodySchema,
    })
  )
  //@UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListTriggersDto, 'loggedUserId'>
  ) {
    const result = await this.listTriggersService.list({
      ...input,
      loggedUserId: query.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
