import {
  DeleteBudgetWithCategoryTransactionRepository,
  DeleteBudgetWithCategoryTransactionDto,
} from '../../../../index';
import { BudgetWithCategoryTransactionMock } from '../../../entities';

export class DeleteBudgetWithCategoryTransactionRepositoryMock
  implements DeleteBudgetWithCategoryTransactionRepository
{
  inputMock = {} as DeleteBudgetWithCategoryTransactionDto;
  async delete(input: DeleteBudgetWithCategoryTransactionDto): Promise<string> {
    this.inputMock = input;
    return BudgetWithCategoryTransactionMock.id;
  }
}
