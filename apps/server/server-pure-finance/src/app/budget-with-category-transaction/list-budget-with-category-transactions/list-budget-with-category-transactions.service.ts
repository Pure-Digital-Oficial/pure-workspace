import { Injectable } from '@nestjs/common';
import {
  ListBudgetWithCategoryTransactions,
  ListBudgetWithCategoryTransactionsDto,
} from '@pure-workspace/domain';

@Injectable()
export class ListBudgetWithCategoryTransactionsService {
  constructor(private useCase: ListBudgetWithCategoryTransactions) {}

  async list(input: ListBudgetWithCategoryTransactionsDto) {
    return await this.useCase.execute(input);
  }
}
