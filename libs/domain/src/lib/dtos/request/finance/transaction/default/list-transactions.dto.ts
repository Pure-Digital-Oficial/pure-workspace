import { ListTransactionFiltersDto } from '.';

export interface ListTransactionsDto {
  filters?: ListTransactionFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
