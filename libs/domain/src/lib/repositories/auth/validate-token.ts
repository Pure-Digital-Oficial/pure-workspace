import { ValidateTokenDto } from '../../dtos';

export interface ValidateTokenRepository {
  validate(input: ValidateTokenDto): Promise<string>;
}
