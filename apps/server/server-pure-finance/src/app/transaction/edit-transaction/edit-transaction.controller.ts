import { Body, Controller, Param, Put, Query } from '@nestjs/common';
import { EditTransactionDto, ErrorMessageResult } from '@pure-workspace/domain';
import { EditTransactionService } from './edit-transaction.service';

@Controller('transaction/edit-transaction')
export class EditTransactionController {
  constructor(private editTransactionService: EditTransactionService) {}

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Query() query: { userId: string },
    @Body() input: Omit<EditTransactionDto, 'loggedUserId' | 'id'>
  ) {
    const result = await this.editTransactionService.edit({
      ...input,
      loggedUserId: query?.userId ?? '',
      id,
    });

    if (result.isRight()) return { transaction_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
