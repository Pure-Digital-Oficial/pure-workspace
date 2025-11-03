import { ListCategoryTransactionsFiltersDto } from '.';

export interface ListCategoryTransactionsDto {
  filters?: ListCategoryTransactionsFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
