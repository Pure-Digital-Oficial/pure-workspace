import { ListTargetsFiltersDto } from './list-targets-filters.dto';

export interface ListTargetsDto {
  filters?: ListTargetsFiltersDto;
  triggerId: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
