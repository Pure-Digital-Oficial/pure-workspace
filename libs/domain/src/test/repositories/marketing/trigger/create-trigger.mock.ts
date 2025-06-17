import { CreateTriggerDto, CreateTriggerRepository } from '../../../../../src';
import { TriggerMock } from '../../../entities';

export class CreateTriggerRepositoryMock implements CreateTriggerRepository {
  inputMock = {} as CreateTriggerDto;
  async create(input: CreateTriggerDto): Promise<string> {
    this.inputMock = input;
    return TriggerMock.id;
  }
}
