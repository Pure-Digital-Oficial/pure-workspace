import { ListShotModelsDto, ListShotModelsResponseDto } from '../../../../dtos';

export interface ListShotModelsRepository {
  list(input: ListShotModelsDto): Promise<ListShotModelsResponseDto>;
}
