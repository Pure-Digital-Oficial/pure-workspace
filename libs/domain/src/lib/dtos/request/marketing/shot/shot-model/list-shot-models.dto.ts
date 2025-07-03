import { ListShotModelsFiltersDto } from './list-shot-models-filters.dto';

export interface ListShotModelsDto {
  filters?: ListShotModelsFiltersDto;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
