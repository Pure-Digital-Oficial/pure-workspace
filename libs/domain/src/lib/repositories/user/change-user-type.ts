import { ChangeUserTypeDto } from '../../dtos';

export interface ChangeUserTypeRepository {
  change(input: ChangeUserTypeDto): Promise<string>;
}
