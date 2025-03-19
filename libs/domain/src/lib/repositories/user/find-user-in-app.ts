import { FindUserInAppDto } from '../../dtos';

export interface FindUserInAppRepository {
  find(input: FindUserInAppDto): Promise<string>;
}
