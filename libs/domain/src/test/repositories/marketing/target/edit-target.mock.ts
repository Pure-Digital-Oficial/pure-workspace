import { EditTargetDto, EditTargetRepository } from '../../../../../src';
import { TargetMock } from '../../../entities';

export class EditTargetRepositoryMock implements EditTargetRepository {
  inptuMock = {} as EditTargetDto;
  async edit(input: EditTargetDto): Promise<string> {
    this.inptuMock = input;
    return TargetMock.id;
  }
}
