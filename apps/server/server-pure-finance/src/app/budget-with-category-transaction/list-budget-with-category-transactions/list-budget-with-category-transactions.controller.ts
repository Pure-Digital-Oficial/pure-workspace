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
  ListBudgetWithCategoryTransactionsDto,
  listBudgetWithCategoryTransactionsBodySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes';
import { ListBudgetWithCategoryTransactionsService } from './list-budget-with-category-transactions.service';

@Controller(
  'budget-with-category-transaction/list-budget-with-category-transactions'
)
export class ListBudgetWithCategoryTransactionsController {
  constructor(
    private listBudgetWithCategoryTransactionsService: ListBudgetWithCategoryTransactionsService
  ) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listBudgetWithCategoryTransactionsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListBudgetWithCategoryTransactionsDto, 'loggedUserId'>
  ) {
    const result = await this.listBudgetWithCategoryTransactionsService.list({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
