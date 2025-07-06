import { ListShotsDto, ListShotsResponseDto } from '../../../dtos';

export interface ListShotsRepository {
  list(input: ListShotsDto): Promise<ListShotsResponseDto>;
}
