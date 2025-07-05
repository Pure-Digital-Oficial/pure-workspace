import { FindShotByEntityDto } from '../../../dtos';

export interface FindShotByTitleRepository {
  find(input: FindShotByEntityDto): Promise<string>;
}
