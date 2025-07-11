import { FindShotByEntityDto, ListTargetsResponseDto } from '../../../dtos';

export interface FindTargetsByShotIdRepository {
  find(input: FindShotByEntityDto): Promise<ListTargetsResponseDto>;
}
