import { TransactionResponseDto } from '.';

export interface ListTransactionsResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  transactions: TransactionResponseDto[];
}
