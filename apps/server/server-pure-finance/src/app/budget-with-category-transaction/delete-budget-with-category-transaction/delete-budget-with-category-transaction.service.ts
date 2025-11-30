import { Injectable } from '@nestjs/common';
import {
  DeleteBudgetWithCategoryTransaction,
  DeleteBudgetWithCategoryTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class DeleteBudgetWithCategoryTransactionService {
  constructor(private useCase: DeleteBudgetWithCategoryTransaction) {}

  async delete(input: DeleteBudgetWithCategoryTransactionDto) {
    return await this.useCase.execute(input);
  }
}
