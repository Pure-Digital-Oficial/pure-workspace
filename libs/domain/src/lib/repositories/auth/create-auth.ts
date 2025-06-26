import { CreateAuthDto } from '../../dtos';

export interface CreateAuthRepository {
  create(input: CreateAuthDto): Promise<string>;
}
