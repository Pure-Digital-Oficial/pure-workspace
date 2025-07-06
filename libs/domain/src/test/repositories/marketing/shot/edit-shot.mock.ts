import { EditShotDto, EditShotRepository } from '../../../../../src';
import { ShotMock } from '../../../entities';

export class EditShotRepositoryMock implements EditShotRepository {
  inptuMock = {} as EditShotDto;
  async edit(input: EditShotDto): Promise<string> {
    this.inptuMock = input;
    return ShotMock.id;
  }
}
