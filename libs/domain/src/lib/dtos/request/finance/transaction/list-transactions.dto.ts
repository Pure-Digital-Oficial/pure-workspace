import { ListTransactionFiltersDto } from './list-transactions-filters.dto';

export interface ListTransactionsDto {
  filters?: ListTransactionFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
