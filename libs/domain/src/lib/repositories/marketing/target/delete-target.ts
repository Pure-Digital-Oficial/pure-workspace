import { DeleteTargetDto } from '../../../dtos';

export interface DeleteTargetRepository {
  delete(input: DeleteTargetDto): Promise<string>;
}
