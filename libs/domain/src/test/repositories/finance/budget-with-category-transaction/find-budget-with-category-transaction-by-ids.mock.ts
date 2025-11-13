import {
  BudgetWithCategoryTransactionBodyDto,
  FindBudgetWithCategoryTransactionByIdsRepository,
} from '../../../../index';

export class FindBudgetWithCategoryTransactionByIdsRepositoryMock
  implements FindBudgetWithCategoryTransactionByIdsRepository
{
  inputMock = {} as Omit<BudgetWithCategoryTransactionBodyDto, 'loggedUserId'>;
  async find(
    input: Omit<BudgetWithCategoryTransactionBodyDto, 'loggedUserId'>
  ): Promise<string> {
    this.inputMock = input;
    return '';
  }
}
