import {
  Body,
  Controller,
  Delete,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  DeleteBudgetWithCategoryTransactionDto,
  ErrorMessageResult,
  budgetWithCategoryTransactionBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { DeleteBudgetWithCategoryTransactionService } from './delete-budget-with-category-transaction.service';

@Controller(
  'budget-with-category-transaction/delete-budget-with-category-transaction'
)
export class DeleteBudgetWithCategoryTransactionController {
  constructor(
    private deleteBudgetWithCategoryTransactionService: DeleteBudgetWithCategoryTransactionService
  ) {}

  @Delete()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: budgetWithCategoryTransactionBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async delete(
    @Query() query: { userId: string },
    @Body() input: Omit<DeleteBudgetWithCategoryTransactionDto, 'loggedUserId'>
  ) {
    const result = await this.deleteBudgetWithCategoryTransactionService.delete(
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
