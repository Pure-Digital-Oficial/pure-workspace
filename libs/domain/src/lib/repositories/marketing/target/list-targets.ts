import { ListTargetsDto, ListTargetsResponseDto } from '../../../dtos';

export interface ListTargetsRepository {
  list(input: ListTargetsDto): Promise<ListTargetsResponseDto>;
}
