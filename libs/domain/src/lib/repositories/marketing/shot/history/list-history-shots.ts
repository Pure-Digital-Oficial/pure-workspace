import {
  ListHistoryShotsDto,
  ListHistoryShotsResponseDto,
} from '../../../../dtos';

export interface ListHistoryShotsRepository {
  list(input: ListHistoryShotsDto): Promise<ListHistoryShotsResponseDto>;
}
