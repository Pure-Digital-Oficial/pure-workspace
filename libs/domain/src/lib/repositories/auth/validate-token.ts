import { ValidateTokenRepositoryDto } from '../../dtos';

export interface ValidateTokenRepository {
  validate(input: ValidateTokenRepositoryDto): Promise<string>;
}
