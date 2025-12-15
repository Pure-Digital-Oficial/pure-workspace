import { DeleteBudgetWithCategoryTransactionDto } from '@pure-workspace/domain';

export interface DeleteBudgetWithCategoryTransactionInterface
  extends Pick<
    DeleteBudgetWithCategoryTransactionDto,
    'budgetId' | 'categoryTransactionId'
  > {
  type: 'budget' | 'category';
}
