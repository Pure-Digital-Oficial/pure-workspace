import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ErrorMessageResult,
  transactionBodySchema,
  userIdQuerySchema,
  CreateTransactionDto,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../pipes';
import { CreateTransactionService } from './create-transaction.service';

@Controller('transaction/create-transaction')
export class CreateTransactionController {
  constructor(private createTransactionService: CreateTransactionService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: transactionBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateTransactionDto, 'loggedUserId'>
  ) {
    const result = await this.createTransactionService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { transaction_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
