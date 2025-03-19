import { AccessTokenResponseDto, SignInDto } from '../../dtos';

export interface SignIdRepository {
  sign(input: SignInDto): Promise<AccessTokenResponseDto>;
}
