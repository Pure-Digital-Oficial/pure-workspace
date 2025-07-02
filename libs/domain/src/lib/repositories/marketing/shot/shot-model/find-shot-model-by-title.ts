import {
  FindShotModelByEntityDto,
  ShotModelResponseDto,
} from '../../../../dtos';

export interface FindShotModelByTitleRepository {
  find(input: FindShotModelByEntityDto): Promise<ShotModelResponseDto>;
}
