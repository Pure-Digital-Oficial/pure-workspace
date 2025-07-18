import { ListShotsFiltersDto } from './list-shots-filters.dto';

export interface ListShotsDto {
  filters?: ListShotsFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
