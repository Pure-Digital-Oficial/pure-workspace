import { CreateUniqueTargetDto } from '../../../dtos';

export interface CreateUniqueTargetRepository {
  create(input: CreateUniqueTargetDto): Promise<string>;
}
