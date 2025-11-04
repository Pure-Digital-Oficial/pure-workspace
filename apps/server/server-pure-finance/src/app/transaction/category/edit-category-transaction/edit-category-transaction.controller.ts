import {
  Body,
  Controller,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  categoryTransactionBodySchema,
  EditCategoryTransactionDto,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { EditCategoryTransactionService } from './edit-category-transaction.service';
import { ZodValidationPipe } from '../../../pipes';

@Controller('transaction/edit-category-transaction')
export class EditCategoryTransactionController {
  constructor(
    private editCategoryTransactionService: EditCategoryTransactionService
  ) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: categoryTransactionBodySchema,
    })
  )
  async edit(
    @Param('id') id: string,
    @Query() query: { userId: string },
    @Body() input: Omit<EditCategoryTransactionDto, 'loggedUserId' | 'id'>
  ) {
    const result = await this.editCategoryTransactionService.edit({
      ...input,
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { category_transaction_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
