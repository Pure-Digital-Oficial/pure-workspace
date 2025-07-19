import { DeleteShotDto, DeleteShotRepository } from '../../../../../../src';
import { ShotMock } from '../../../../entities';

export class DeleteShotRepositoryMock implements DeleteShotRepository {
  inptuMock = {} as DeleteShotDto;
  async delete(input: DeleteShotDto): Promise<string> {
    this.inptuMock = input;
    return ShotMock.id;
  }
}
