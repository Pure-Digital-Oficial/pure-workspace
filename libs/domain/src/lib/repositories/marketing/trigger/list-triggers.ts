import { ListTriggersDto, ListTriggersResponseDto } from '../../../dtos';

export interface ListTriggersRepository {
  list(input: ListTriggersDto): Promise<ListTriggersResponseDto>;
}
