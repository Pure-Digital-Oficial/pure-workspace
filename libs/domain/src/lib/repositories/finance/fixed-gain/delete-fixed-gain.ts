import { DeleteFixedGainDto } from '../../../dtos';

export interface DeleteFixedGainRepository {
  delete(input: DeleteFixedGainDto): Promise<string>;
}
