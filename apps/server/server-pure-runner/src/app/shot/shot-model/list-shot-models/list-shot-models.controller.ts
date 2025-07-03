import {
  Controller,
  Get,
  Query,
  UsePipes,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ListShotModelsService } from './list-shot-models.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListShotModelsDto,
  listShotModelsBodySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';

@Controller('list-shot-models')
export class ListShotModelsController {
  constructor(private readonly listShotModelsService: ListShotModelsService) {}

  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listShotModelsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListShotModelsDto, 'loggedUserId'>
  ) {
    const result = await this.listShotModelsService.list({
      ...input,
      loggedUserId: query.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
