import { DeleteTriggerDto, DeleteTriggerRepository } from '../../../../../src';
import { TriggerMock } from '../../../entities';

export class DeleteTriggerRepositoryMock implements DeleteTriggerRepository {
  inptuMock = {} as DeleteTriggerDto;
  async delete(input: DeleteTriggerDto): Promise<string> {
    this.inptuMock = input;
    return TriggerMock.id;
  }
}
