import { EditTargetDto } from '../../../dtos';

export interface EditTargetRepository {
  edit(input: EditTargetDto): Promise<string>;
}
