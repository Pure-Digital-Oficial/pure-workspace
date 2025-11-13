import {
  CreateBudgetWithCategoryTransactionDto,
  CreateBudgetWithCategoryTransactionRepository,
} from '../../../../index';
import { BudgetWithCategoryTransactionMock } from '../../../entities';

export class CreateBudgetWithCategoryTransactionRepositoryMock
  implements CreateBudgetWithCategoryTransactionRepository
{
  inputMock = {} as CreateBudgetWithCategoryTransactionDto;
  async create(input: CreateBudgetWithCategoryTransactionDto): Promise<string> {
    this.inputMock = input;
    return BudgetWithCategoryTransactionMock.id;
  }
}
