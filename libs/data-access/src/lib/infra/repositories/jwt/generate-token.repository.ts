import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  GenerateTokenDto,
  GenerateTokenRepository,
} from '@pure-workspace/domain';

export class GenerateTokenRepositoryImpl implements GenerateTokenRepository {
  constructor(
    @Inject('JwtService')
    private jwtService: JwtService
  ) {}
  async generate(input: GenerateTokenDto): Promise<string> {
    const { email, userId, secret, expiresIn } = input;

    const createdJWT = await this.jwtService.signAsync(
      { sub: userId, email },
      { secret: secret, expiresIn: expiresIn }
    );

    return createdJWT;
  }
}
