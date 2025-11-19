import {
  ListBudgetWithCategoryTransactionsResponseDto,
  ListBudgetWithCategoryTransactionsDto,
} from '../../../dtos';

export interface ListBudgetWithCategoryTransactionsRepository {
  list(
    input: ListBudgetWithCategoryTransactionsDto
  ): Promise<ListBudgetWithCategoryTransactionsResponseDto>;
}
