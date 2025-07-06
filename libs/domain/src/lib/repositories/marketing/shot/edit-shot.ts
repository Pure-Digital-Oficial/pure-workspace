import { EditShotDto } from '../../../dtos';

export interface EditShotRepository {
  edit(input: EditShotDto): Promise<string>;
}
