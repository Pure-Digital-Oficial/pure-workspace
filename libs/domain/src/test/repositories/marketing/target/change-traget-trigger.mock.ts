import {
  ChangeUniqueTargetTriggerDto,
  ChangeTargetTriggerRepository,
} from '../../../..';
import { TargetMock } from '../../../entities';

export class ChangeTargetTriggerRepositoryMock
  implements ChangeTargetTriggerRepository
{
  inputMock = {} as ChangeUniqueTargetTriggerDto;
  async change(input: ChangeUniqueTargetTriggerDto): Promise<string> {
    this.inputMock = input;
    return TargetMock.id;
  }
}
