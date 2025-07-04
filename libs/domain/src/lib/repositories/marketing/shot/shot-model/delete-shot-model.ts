import { DeleteShotModelDto } from '../../../../dtos';

export interface DeleteShotModelRepository {
  delete(input: DeleteShotModelDto): Promise<string>;
}
