import {
  EditBudgetWithCategoryTransactionRepository,
  EditBudgetWithCategoryTransactionDto,
} from '../../../../index';
import { BudgetWithCategoryTransactionMock } from '../../../entities';

export class EditBudgetWithCategoryTransactionRepositoryMock
  implements EditBudgetWithCategoryTransactionRepository
{
  inputMock = {} as EditBudgetWithCategoryTransactionDto;
  async edit(input: EditBudgetWithCategoryTransactionDto): Promise<string> {
    this.inputMock = input;
    return BudgetWithCategoryTransactionMock.id;
  }
}
