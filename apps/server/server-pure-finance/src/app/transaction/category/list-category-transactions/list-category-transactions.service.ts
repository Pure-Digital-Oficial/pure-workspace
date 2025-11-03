import { Injectable } from '@nestjs/common';
import {
  ListCategoryTransactions,
  ListCategoryTransactionsDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListCategoryTransactionsService {
  constructor(private useCase: ListCategoryTransactions) {}

  async list(input: ListCategoryTransactionsDto) {
    return await this.useCase.execute(input);
  }
}
