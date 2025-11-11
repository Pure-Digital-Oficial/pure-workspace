import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  listBudgetsBodySchema,
  ListBudgetsDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { ListBudgetsService } from './list-budgets.service';

@Controller('budget/list-budgets')
export class ListBudgetsController {
  constructor(private listBudgetsService: ListBudgetsService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listBudgetsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListBudgetsDto, 'loggedUserId'>
  ) {
    const result = await this.listBudgetsService.list({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
