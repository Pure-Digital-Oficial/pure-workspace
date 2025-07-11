import {
  Controller,
  Get,
  Query,
  UsePipes,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ListHistoryShotsService } from './list-history-shots.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListHistoryShotsDto,
  listHistoryShotsBodySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('list-history-shots')
export class ListHistoryShotsController {
  constructor(private readonly listShotsService: ListHistoryShotsService) {}

  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listHistoryShotsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListHistoryShotsDto, 'loggedUserId'>
  ) {
    const result = await this.listShotsService.list({
      ...input,
      loggedUserId: query.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
