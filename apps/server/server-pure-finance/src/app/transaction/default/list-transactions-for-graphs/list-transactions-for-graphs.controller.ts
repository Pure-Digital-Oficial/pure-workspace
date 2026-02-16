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
  listTransactionsForGraphsBodySchema,
  ListTransactionsForGraphsDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../../pipes';
import { ListTransactionsForGraphsService } from './list-transactions-for-graphs.service';

@Controller('transaction/list-transactions-for-graphs')
export class ListTransactionsForGraphsController {
  constructor(
    private listTransactionsForGraphsService: ListTransactionsForGraphsService
  ) {}

  @Post()
  @UsePipes(
    new ZodValidationPipe({
      query: userIdQuerySchema,
      body: listTransactionsForGraphsBodySchema,
    })
  )
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: { userId: string },
    @Body() input: Omit<ListTransactionsForGraphsDto, 'loggedUserId'>
  ) {
    const result = await this.listTransactionsForGraphsService.list({
      finalDate: new Date(input.finalDate),
      initialDate: new Date(input.initialDate),
      loggedUserId: query?.userId ?? '',
    });

    if (result.isRight()) return result.value;
    else
      return await ErrorMessageResult(result.value.name, result.value.message);
  }
}
