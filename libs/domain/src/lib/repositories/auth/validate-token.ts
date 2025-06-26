import { ValidateTokenDto, ValidateTokenResponseDto } from '../../dtos';

export interface ValidateTokenRepository {
  validate(input: ValidateTokenDto): Promise<ValidateTokenResponseDto>;
}
