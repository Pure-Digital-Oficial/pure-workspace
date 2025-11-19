import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  CreateBudgetWithCategoryTransactionDto,
  ErrorMessageResult,
  budgetWithCategoryTransactionBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { CreateBudgetWithCategoryTransactionService } from './create-budget-with-category-transaction.service';

@Controller(
  'budget-with-category-transaction/create-budget-with-category-transaction'
)
export class CreateBudgetWithCategoryTransactionController {
  constructor(
    private createBudgetWithCategoryTransactionService: CreateBudgetWithCategoryTransactionService
  ) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: budgetWithCategoryTransactionBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateBudgetWithCategoryTransactionDto, 'loggedUserId'>
  ) {
    const result = await this.createBudgetWithCategoryTransactionService.create(
      {
        ...input,
        loggedUserId: query?.userId ?? '',
      }
    );

    if (result.isRight()) return { budget_with_category_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
