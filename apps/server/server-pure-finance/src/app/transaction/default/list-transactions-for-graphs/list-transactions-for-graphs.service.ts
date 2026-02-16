import { Injectable } from '@nestjs/common';
import {
  ListTransactionsForGraphs,
  ListTransactionsForGraphsDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListTransactionsForGraphsService {
  constructor(private useCase: ListTransactionsForGraphs) {}

  async list(input: ListTransactionsForGraphsDto) {
    return await this.useCase.execute(input);
  }
}
