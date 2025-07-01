import { CreateShotModelDto } from '../../../../dtos';

export interface CreateShotModelRepository {
  create(input: CreateShotModelDto): Promise<string>;
}
