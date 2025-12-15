import { Injectable } from '@nestjs/common';
import {
  EditBudgetWithCategoryTransaction,
  EditBudgetWithCategoryTransactionDto,
} from '@pure-workspace/domain';

@Injectable()
export class EditBudgetWithCategoryTransactionService {
  constructor(private useCase: EditBudgetWithCategoryTransaction) {}

  async edit(input: EditBudgetWithCategoryTransactionDto) {
    return await this.useCase.execute(input);
  }
}
