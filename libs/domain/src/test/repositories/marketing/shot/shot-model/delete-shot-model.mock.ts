import {
  DeleteShotModelDto,
  DeleteShotModelRepository,
} from '../../../../../../src';
import { ShotModelMock } from '../../../../entities';

export class DeleteShotModelRepositoryMock
  implements DeleteShotModelRepository
{
  inptuMock = {} as DeleteShotModelDto;
  async delete(input: DeleteShotModelDto): Promise<string> {
    this.inptuMock = input;
    return ShotModelMock.id;
  }
}
