import { ListPlansDto, ListPlansResponseDto } from '../../../dtos';

export interface ListPlansRepository {
  list(input: ListPlansDto): Promise<ListPlansResponseDto>;
}
