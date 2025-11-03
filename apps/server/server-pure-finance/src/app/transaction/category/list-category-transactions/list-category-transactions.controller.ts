import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '@pure-workspace/data-access';
import {
  ErrorMessageResult,
  userIdQuerySchema,
  ListCategoryTransactionsDto,
  listCategoryTransactionsBodySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { ListCategoryTransactionsService } from './list-category-transactions.service';

@Controller('transaction/list-category-transactions')
export class ListCategoryTransactionsController {
  constructor(
    private listCategoryTransactionsService: ListCategoryTransactionsService
  ) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listCategoryTransactionsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListCategoryTransactionsDto, 'loggedUserId'>
  ) {
    const result = await this.listCategoryTransactionsService.list({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
