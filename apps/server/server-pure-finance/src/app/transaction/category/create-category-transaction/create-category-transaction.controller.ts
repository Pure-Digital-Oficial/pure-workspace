import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  categoryTransactionBodySchema,
  CreateCategoryTransactionDto,
  ErrorMessageResult,
  userIdQuerySchema,
} from '@pure-workspace/domain';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import { ZodValidationPipe } from '../../../pipes';
import { CreateCategoryTransactionService } from './create-category-transaction.service';

@Controller('transaction/create-category-transaction')
export class CreateCategoryTransactionController {
  constructor(
    private createCategoryTransactionService: CreateCategoryTransactionService
  ) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: categoryTransactionBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Query() query: { userId: string },
    @Body() input: Omit<CreateCategoryTransactionDto, 'loggedUserId'>
  ) {
    const result = await this.createCategoryTransactionService.create({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return { category_transaction_id: result.value };
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
