import {
  Controller,
  Get,
  Query,
  UsePipes,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ListShotsService } from './list-shots.service';
import { ZodValidationPipe } from '../../../pipes';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListShotsDto,
  listShotsBodySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('list-shots')
export class ListShotsController {
  constructor(private readonly listShotsService: ListShotsService) {}

  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listShotsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListShotsDto, 'loggedUserId'>
  ) {
    const result = await this.listShotsService.list({
      ...input,
      loggedUserId: query.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
