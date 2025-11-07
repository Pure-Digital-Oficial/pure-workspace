import { EditFixedGainDto } from '../../../dtos';

export interface EditFixedGainRepository {
  edit(input: EditFixedGainDto): Promise<string>;
}
