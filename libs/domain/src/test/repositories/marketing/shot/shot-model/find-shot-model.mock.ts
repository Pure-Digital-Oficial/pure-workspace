import {
  FindShotModelByIdRepository,
  ShotModelResponseDto,
} from '../../../../../../src';
import { ShotModelMock } from '../../../../entities';

export class FindShotModelByIdRepositoryMock
  implements FindShotModelByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<ShotModelResponseDto> {
    this.inputMock = id;
    return ShotModelMock;
  }
}
