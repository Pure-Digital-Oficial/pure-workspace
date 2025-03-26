import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ValidateTokenRepository,
  ValidateTokenRepositoryDto,
} from '@pure-workspace/domain';

export class ValidateTokenRepositoryImpl implements ValidateTokenRepository {
  constructor(
    @Inject('JwtService')
    private jwtService: JwtService
  ) {}
  async validate(input: ValidateTokenRepositoryDto): Promise<string> {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(input.token, { secret: input.secret });

      return payload.sub;
    } catch {
      return '';
    }
  }
}
