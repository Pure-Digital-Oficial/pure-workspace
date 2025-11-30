import { DeleteBudgetWithCategoryTransactionDto } from '../../../dtos';

export interface DeleteBudgetWithCategoryTransactionRepository {
  delete(input: DeleteBudgetWithCategoryTransactionDto): Promise<string>;
}
