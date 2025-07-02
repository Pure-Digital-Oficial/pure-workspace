import {
  FindShotModelByEntityDto,
  ShotModelResponseDto,
} from '../../../../dtos';

export interface FindShotModelBySubjectRepository {
  find(input: FindShotModelByEntityDto): Promise<ShotModelResponseDto>;
}
