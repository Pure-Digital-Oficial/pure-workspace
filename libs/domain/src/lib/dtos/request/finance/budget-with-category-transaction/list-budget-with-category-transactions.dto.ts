import { ListBudgetWithCategoryTransactionsFiltersDto } from '.';

export interface ListBudgetWithCategoryTransactionsDto {
  filters?: ListBudgetWithCategoryTransactionsFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
