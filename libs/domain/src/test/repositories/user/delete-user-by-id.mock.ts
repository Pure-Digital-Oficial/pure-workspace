import { DeleteUserByIdDto, DeleteUserByIdRepository } from '../../../../src';
import { UserMock } from '../../entities';

export class DeleteUserByIdRepositoryMock implements DeleteUserByIdRepository {
  inptuMock = {} as DeleteUserByIdDto;
  async delete(input: DeleteUserByIdDto): Promise<string> {
    this.inptuMock = input;
    return UserMock.id;
  }
}
