import { DeleteTriggerDto } from '../../../dtos';

export interface DeleteTriggerRepository {
  delete(input: DeleteTriggerDto): Promise<string>;
}
