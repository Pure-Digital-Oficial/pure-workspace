import {
  ChangeShotModelInShotDto,
  ChangeShotModelInShotRepository,
} from '../../../../../src';
import { ShotMock } from '../../../entities';

export class ChangeShotModelInShotRepositoryMock
  implements ChangeShotModelInShotRepository
{
  inputMock = {} as ChangeShotModelInShotDto;
  async change(input: ChangeShotModelInShotDto) {
    this.inputMock = input;
    return ShotMock.id;
  }
}
