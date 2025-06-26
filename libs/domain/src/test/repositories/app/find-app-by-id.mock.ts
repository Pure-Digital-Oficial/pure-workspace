import { FindAppByIdRepository } from '../../../../src';
import { AppResponseDto } from '../../../../src';
import { AppMock } from '../../entities';

export class FindAppByIdRepositoryMock implements FindAppByIdRepository {
  idMock = '';
  async find(id: string): Promise<AppResponseDto> {
    this.idMock = id;
    return AppMock;
  }
}
