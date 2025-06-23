import { EditTriggerDto, EditTriggerRepository } from '../../../../../src';
import { TriggerMock } from '../../../entities';

export class EditTriggerRepositoryMock implements EditTriggerRepository {
  inptuMock = {} as EditTriggerDto;
  async edit(input: EditTriggerDto): Promise<string> {
    this.inptuMock = input;
    return TriggerMock.id;
  }
}
