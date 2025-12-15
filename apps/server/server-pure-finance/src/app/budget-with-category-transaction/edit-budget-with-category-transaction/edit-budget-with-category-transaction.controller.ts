import {
  Body,
  Controller,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  EditBudgetWithCategoryTransactionDto,
  ErrorMessageResult,
  editBudgetWithCategoryTransactionBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { EditBudgetWithCategoryTransactionService } from './edit-budget-with-category-transaction.service';

@Controller(
  'budget-with-category-transaction/edit-budget-with-category-transaction'
)
export class EditBudgetWithCategoryTransactionController {
  constructor(
    private editBudgetWithCategoryTransactionService: EditBudgetWithCategoryTransactionService
  ) {}

  @Put()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: editBudgetWithCategoryTransactionBodySchema,
    })
  )
  //@UseGuards(JwtAuthGuard)
  async edit(
    @Query() query: { userId: string },
    @Body() input: Omit<EditBudgetWithCategoryTransactionDto, 'loggedUserId'>
  ) {
    const result = await this.editBudgetWithCategoryTransactionService.edit({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { budget_with_category_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
