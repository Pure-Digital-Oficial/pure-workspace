import { Injectable } from '@nestjs/common';
import {
  ListTotalTransactions,
  ListTotalTransactionsDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListTotalTransactionsService {
  constructor(private useCase: ListTotalTransactions) {}

  async list(input: ListTotalTransactionsDto) {
    return await this.useCase.execute(input);
  }
}
