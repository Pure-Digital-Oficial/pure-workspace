import {
  ListTriggersDto,
  ListTriggersRepository,
  ListTriggersResponseDto,
} from '../../../../../src';
import { ListTriggersMock } from '../../../entities';

export class ListTriggersRepositoryMock implements ListTriggersRepository {
  inputMock = {} as ListTriggersDto;
  async list(input: ListTriggersDto): Promise<ListTriggersResponseDto> {
    this.inputMock = input;
    return ListTriggersMock;
  }
}
