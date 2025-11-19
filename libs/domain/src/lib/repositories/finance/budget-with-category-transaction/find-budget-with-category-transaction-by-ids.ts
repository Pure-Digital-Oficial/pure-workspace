import { BudgetWithCategoryTransactionBodyDto } from '../../../dtos';

export interface FindBudgetWithCategoryTransactionByIdsRepository {
  find(
    input: Omit<BudgetWithCategoryTransactionBodyDto, 'loggedUserId'>
  ): Promise<string>;
}
