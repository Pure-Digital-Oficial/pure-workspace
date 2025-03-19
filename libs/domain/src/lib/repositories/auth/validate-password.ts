import { ValidatePasswordDto } from '../../dtos';

export interface ValidatePasswordRepository {
  validate(input: ValidatePasswordDto): Promise<boolean>;
}
