import { EditShotModelDto } from '../../../../dtos';

export interface EditShotModelRepository {
  edit(input: EditShotModelDto): Promise<string>;
}
