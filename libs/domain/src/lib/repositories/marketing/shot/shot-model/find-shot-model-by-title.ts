import { FindShotModelByEntityDto } from '../../../../dtos';

export interface FindShotModelByTitleRepository {
  find(input: FindShotModelByEntityDto): Promise<string>;
}
