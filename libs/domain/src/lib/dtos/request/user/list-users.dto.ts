import { ListUsersFiltersDto } from './list-users-filters.dto';

export interface ListUsersDto {
  filters?: ListUsersFiltersDto;
  appId: string;
  take?: number;
  skip?: number;
}
