import { Injectable } from '@nestjs/common';
import { ListTransactionsDto, ListTransactions } from '@pure-workspace/domain';

@Injectable()
export class ListTransactionsService {
  constructor(private useCase: ListTransactions) {}

  async list(input: ListTransactionsDto) {
    return await this.useCase.execute(input);
  }
}
