import { GenerateTokenDto } from '../../dtos';

export interface GenerateTokenRepository {
  generate(input: GenerateTokenDto): Promise<string>;
}
