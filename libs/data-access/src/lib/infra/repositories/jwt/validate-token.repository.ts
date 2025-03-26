import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateTokenRepository } from '@pure-workspace/domain';

export class ValidateTokenRepositoryImpl implements ValidateTokenRepository {
  constructor(
    @Inject('JwtService')
    private jwtService: JwtService
  ) {}
  async validate(token: string): Promise<string> {
    const payload = await this.jwtService.verifyAsync<{
      sub: string;
      email: string;
    }>(token);

    return payload.sub;
  }
}
