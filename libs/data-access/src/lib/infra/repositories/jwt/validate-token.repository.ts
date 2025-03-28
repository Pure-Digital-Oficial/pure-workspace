import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ValidateTokenRepository,
  ValidateTokenDto,
  ValidateTokenResponseDto,
} from '@pure-workspace/domain';

export class ValidateTokenRepositoryImpl implements ValidateTokenRepository {
  constructor(
    @Inject('JwtService')
    private jwtService: JwtService
  ) {}
  async validate(input: ValidateTokenDto): Promise<ValidateTokenResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(input.token, { secret: input.secret });

      return {
        userId: payload.sub ?? '',
        email: payload.email ?? '',
      };
    } catch {
      return {} as ValidateTokenResponseDto;
    }
  }
}
