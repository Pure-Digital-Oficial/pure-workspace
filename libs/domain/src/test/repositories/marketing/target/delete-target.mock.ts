import { DeleteTargetDto, DeleteTargetRepository } from '../../../../../src';
import { TargetMock } from '../../../entities';

export class DeleteTargetRepositoryMock implements DeleteTargetRepository {
  inptuMock = {} as DeleteTargetDto;
  async delete(input: DeleteTargetDto): Promise<string> {
    this.inptuMock = input;
    return TargetMock.id;
  }
}
