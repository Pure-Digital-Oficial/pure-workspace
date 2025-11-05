import { CreateFixedGainDto } from '../../../dtos';

export interface CreateFixedGainRepository {
  create(input: CreateFixedGainDto): Promise<string>;
}
