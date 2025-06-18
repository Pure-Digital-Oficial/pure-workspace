import { ListTriggersFiltersDto } from './list-triggers-filters.dto';

export interface ListTriggersDto {
  filters?: ListTriggersFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
