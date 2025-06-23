import { EditTriggerDto } from '../../../dtos';

export interface EditTriggerRepository {
  edit(input: EditTriggerDto): Promise<string>;
}
