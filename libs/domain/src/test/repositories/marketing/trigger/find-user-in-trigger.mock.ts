import {
  FindUserInTriggerDto,
  FindUserInTriggerRepository,
} from '../../../../../src';
import { TriggerMock } from '../../../entities';

export class FindUserInTriggerRepositoryMock
  implements FindUserInTriggerRepository
{
  inptuMock = {} as FindUserInTriggerDto;
  async find(input: FindUserInTriggerDto): Promise<string> {
    this.inptuMock = input;
    return TriggerMock.id;
  }
}
