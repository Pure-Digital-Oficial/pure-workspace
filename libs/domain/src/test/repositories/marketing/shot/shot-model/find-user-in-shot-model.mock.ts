import {
  FindUserInShotModelDto,
  FindUserInShotModelRepository,
} from '../../../../../../src';
import { ShotModelMock } from '../../../../entities';

export class FindUserInShotModelRepositoryMock
  implements FindUserInShotModelRepository
{
  inputMock = {} as FindUserInShotModelDto;
  async find(input: FindUserInShotModelDto): Promise<string> {
    this.inputMock = input;
    return ShotModelMock.id;
  }
}
