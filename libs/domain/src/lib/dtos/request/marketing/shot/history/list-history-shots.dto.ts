import { ListHistoryShotsFiltersDto } from './list-history-shots-filters.dto';

export interface ListHistoryShotsDto {
  filters?: ListHistoryShotsFiltersDto;
  loggedUserId: string;
  shotId: string;
  take?: number;
  skip?: number;
}
