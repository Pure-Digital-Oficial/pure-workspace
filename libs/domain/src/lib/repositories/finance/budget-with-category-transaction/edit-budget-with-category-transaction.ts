import { EditBudgetWithCategoryTransactionDto } from '../../../dtos';

export interface EditBudgetWithCategoryTransactionRepository {
  delete(input: EditBudgetWithCategoryTransactionDto): Promise<string>;
}
