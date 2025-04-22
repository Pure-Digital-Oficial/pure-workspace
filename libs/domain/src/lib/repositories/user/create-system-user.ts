import { CreateSystemUserDto } from '../../dtos';

export interface CreateSystemUserRepository {
  create(input: CreateSystemUserDto): Promise<string>;
}
