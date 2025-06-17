import { CreateTriggerDto } from '../../../dtos';

export interface CreateTriggerRepository {
  create(input: CreateTriggerDto): Promise<string>;
}
