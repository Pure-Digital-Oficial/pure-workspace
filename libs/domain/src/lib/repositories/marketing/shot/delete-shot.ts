import { DeleteShotDto } from '../../../dtos';

export interface DeleteShotRepository {
  delete(input: DeleteShotDto): Promise<string>;
}