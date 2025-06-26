import { DeleteUserByIdDto } from '../../dtos';

export interface DeleteUserByIdRepository {
  delete(input: DeleteUserByIdDto): Promise<string>;
}
