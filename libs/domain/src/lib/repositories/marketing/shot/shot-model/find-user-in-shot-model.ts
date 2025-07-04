import { FindUserInShotModelDto } from '../../../../dtos';

export interface FindUserInShotModelRepository {
  find(input: FindUserInShotModelDto): Promise<string>;
}
