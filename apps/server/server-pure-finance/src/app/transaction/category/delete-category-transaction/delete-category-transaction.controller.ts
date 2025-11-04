import {
  Controller,
  Delete,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ErrorMessageResult, userIdQuerySchema } from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../../pipes';
import { DeleteCategoryTransactionService } from './delete-category-transaction.service';

@Controller('transaction/delete-category-transaction')
export class DeleteCategoryTransactionController {
  constructor(
    private deleteCategoryTransactionService: DeleteCategoryTransactionService
  ) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
    })
  )
  async delete(@Param('id') id: string, @Query() query: { userId: string }) {
    const result = await this.deleteCategoryTransactionService.delete({
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { category_transaction_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
