import { EditBudgetWithCategoryTransactionDto } from '../../../dtos';

export interface EditBudgetWithCategoryTransactionRepository {
  edit(input: EditBudgetWithCategoryTransactionDto): Promise<string>;
}
