import { ShotModelMock } from '../../../../entities';
import {
  CreateShotModelDto,
  CreateShotModelRepository,
} from '../../../../../../src';

export class CreateShotModelRepositoryMock
  implements CreateShotModelRepository
{
  inputMock = {} as CreateShotModelDto;
  async create(input: CreateShotModelDto): Promise<string> {
    this.inputMock = input;
    return ShotModelMock.id;
  }
}
