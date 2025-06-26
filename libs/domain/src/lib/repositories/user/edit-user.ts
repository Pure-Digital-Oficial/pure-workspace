import { EditUserDto } from '../../dtos';

export interface EditUserRepository {
  edit(input: EditUserDto): Promise<string>;
}
