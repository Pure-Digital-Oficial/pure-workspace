import {
  Controller,
  Get,
  Query,
  UsePipes,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ListTargetsService } from './list-targets.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListTargetsDto,
  listTargetsBodySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('list-targets')
export class ListTargetsController {
  constructor(private readonly listTargetsService: ListTargetsService) {}

  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listTargetsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListTargetsDto, 'loggedUserId'>
  ) {
    const result = await this.listTargetsService.list({
      ...input,
      loggedUserId: query.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
