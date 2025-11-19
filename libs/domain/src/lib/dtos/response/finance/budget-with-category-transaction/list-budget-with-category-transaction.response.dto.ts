import { BudgetWithCategoryTransactionResponseDto } from '.';

export interface ListBudgetWithCategoryTransactionsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  items: BudgetWithCategoryTransactionResponseDto[];
}
