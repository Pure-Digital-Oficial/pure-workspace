import { ListPlansFiltersDto } from './list-plans-filters.dto';

export interface ListPlansDto {
  filters?: ListPlansFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
