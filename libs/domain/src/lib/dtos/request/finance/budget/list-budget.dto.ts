import { ListBudgetsFiltersDto } from '.';

export interface ListBudgetsDto {
  filters?: ListBudgetsFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
