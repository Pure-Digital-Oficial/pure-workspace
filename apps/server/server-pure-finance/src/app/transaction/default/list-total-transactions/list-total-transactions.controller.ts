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
  ListTotalTransactionsDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { ListTotalTransactionsService } from './list-total-transactions.service';

@Controller('transaction/list-total-transactions')
export class ListTotalTransactionsController {
  constructor(
    private listTotalTransactionsService: ListTotalTransactionsService
  ) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListTotalTransactionsDto, 'loggedUserId'>
  ) {
    const result = await this.listTotalTransactionsService.list({
      finalDate: new Date(input.finalDate),
      initialDate: new Date(input.initialDate),
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
