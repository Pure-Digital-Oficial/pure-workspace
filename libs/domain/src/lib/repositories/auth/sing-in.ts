import { AccessTokenResponseDto, SignInDto } from '../../dtos';

export interface SignInRepository {
  sign(input: SignInDto): Promise<AccessTokenResponseDto>;
}
