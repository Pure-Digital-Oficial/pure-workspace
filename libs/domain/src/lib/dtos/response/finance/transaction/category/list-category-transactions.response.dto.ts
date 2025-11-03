import { CategoryTransactionResponseDto } from '.';

export interface ListCategoryTransactionsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  transactions: CategoryTransactionResponseDto[];
}
