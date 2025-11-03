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
  ListTransactionsDto,
  listTransactionsBodySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { ListTransactionsService } from './list-transactions.service';

@Controller('transaction/list-transactions')
export class ListTransactionsController {
  constructor(private listTransactionsService: ListTransactionsService) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listTransactionsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListTransactionsDto, 'loggedUserId'>
  ) {
    const result = await this.listTransactionsService.list({
      ...input,
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
