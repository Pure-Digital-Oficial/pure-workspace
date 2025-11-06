import { ListFixedGainsDto, ListFixedGainsResponseDto } from '../../../dtos';

export interface ListFixedGainsRepository {
  list(input: ListFixedGainsDto): Promise<ListFixedGainsResponseDto>;
}
