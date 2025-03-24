import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenResponseDto,
  SignInDto,
  SignInRepository,
} from '@pure-workspace/domain';

export class SignInRepositoryImpl implements SignInRepository {
  constructor(
    @Inject('JwtService')
    private jwtService: JwtService
  ) {}
  async sign(input: SignInDto): Promise<AccessTokenResponseDto> {
    const { email, userId } = input;

    const createdJWT = await this.jwtService.signAsync(
      { sub: userId, email },
      { secret: process.env['JWT_SECRET'], expiresIn: '2h' }
    );

    return {
      token: createdJWT,
    };
  }
}
