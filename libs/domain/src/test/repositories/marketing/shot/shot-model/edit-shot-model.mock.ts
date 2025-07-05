import {
  EditShotModelDto,
  EditShotModelRepository,
} from '../../../../../../src';
import { ShotModelMock } from '../../../../entities';

export class EditShotModelRepositoryMock implements EditShotModelRepository {
  inptuMock = {} as EditShotModelDto;
  async edit(input: EditShotModelDto): Promise<string> {
    this.inptuMock = input;
    return ShotModelMock.id;
  }
}
