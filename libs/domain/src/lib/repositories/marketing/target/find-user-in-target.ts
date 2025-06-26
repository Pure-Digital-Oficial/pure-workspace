import { FindUserInTargetDto } from '../../../dtos';

export interface FindUserInTargetRepository {
  find(input: FindUserInTargetDto): Promise<string>;
}
