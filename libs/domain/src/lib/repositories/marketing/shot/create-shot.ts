import { CreateShotDto } from '../../../dtos';

export interface CreateShotRepository {
  create(input: CreateShotDto): Promise<string>;
}
