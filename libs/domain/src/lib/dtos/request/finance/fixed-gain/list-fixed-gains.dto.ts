import { ListFixedGainsFiltersDto } from '.';

export interface ListFixedGainsDto {
  filters?: ListFixedGainsFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
