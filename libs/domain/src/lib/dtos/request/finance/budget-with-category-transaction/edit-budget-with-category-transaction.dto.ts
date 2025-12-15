import { BudgetWithCategoryTransactionBodyDto } from '.';

export interface EditBudgetWithCategoryTransactionDto
  extends BudgetWithCategoryTransactionBodyDto {
  newBudgetId?: string;
  newCategoryTransactionId?: string;
}
