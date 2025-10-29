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
  EditTransactionDto,
  ErrorMessageResult,
  transactionBodySchema,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { EditTransactionService } from './edit-transaction.service';
import { ZodValidationPipe } from '../../pipes';

@Controller('transaction/edit-transaction')
export class EditTransactionController {
  constructor(private editTransactionService: EditTransactionService) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: transactionBodySchema,
    })
  )
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
