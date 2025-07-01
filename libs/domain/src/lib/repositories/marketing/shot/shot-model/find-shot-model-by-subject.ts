import { FindShotModelByEntityDto } from '../../../../dtos';

export interface FindShotModelBySubjectRepository {
  find(input: FindShotModelByEntityDto): Promise<string>;
}
