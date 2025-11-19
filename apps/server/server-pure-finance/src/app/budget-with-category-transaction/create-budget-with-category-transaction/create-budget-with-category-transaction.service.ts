import { Injectable } from '@nestjs/common';
import {
  CreateBudgetWithCategoryTransaction,
  CreateBudgetWithCategoryTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class CreateBudgetWithCategoryTransactionService {
  constructor(private useCase: CreateBudgetWithCategoryTransaction) {}

  async create(input: CreateBudgetWithCategoryTransactionDto) {
    return await this.useCase.execute(input);
  }
}
