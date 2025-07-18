import { FindShotByEntityDto, ShotResponseDto } from '../../../../dtos';

export interface FindShotByTitleRepository {
  find(input: FindShotByEntityDto): Promise<ShotResponseDto>;
}
