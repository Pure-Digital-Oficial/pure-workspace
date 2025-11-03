import {
  Controller,
  Delete,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ErrorMessageResult,
  transactionBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../../pipes';
import { DeleteTransactionService } from './delete-transaction.service';

@Controller('transaction/delete-transaction')
export class DeleteTransactionController {
  constructor(private deleteTransactionService: DeleteTransactionService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: transactionBodySchema,
    })
  )
  async delete(@Param('id') id: string, @Query() query: { userId: string }) {
    const result = await this.deleteTransactionService.delete({
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { transaction_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
