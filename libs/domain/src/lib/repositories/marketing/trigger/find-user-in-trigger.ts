import { FindUserInTriggerDto } from '../../../dtos';

export interface FindUserInTriggerRepository {
  find(input: FindUserInTriggerDto): Promise<string>;
}
