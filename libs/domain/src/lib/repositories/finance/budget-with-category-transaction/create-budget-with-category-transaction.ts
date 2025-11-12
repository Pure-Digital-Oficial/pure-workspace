import { CreateBudgetWithCategoryTransactionDto } from '../../../dtos';

export interface CreateBudgetWithCategoryTransactionRepository {
  create(input: CreateBudgetWithCategoryTransactionDto): Promise<string>;
}
