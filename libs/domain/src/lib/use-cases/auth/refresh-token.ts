import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { TokenDto, TokenResponseDto } from '../../dtos';
import {
  EntityIsInvalid,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../errors';
import {
  FindUserByIdRepository,
  GenerateTokenRepository,
  ValidateTokenRepository,
} from '../../repositories';
import { UserVerificationId } from '../../utils';

export class RefreshToken
  implements
    UseCase<
      TokenDto,
      Either<
        EntityNotEmpty | EntityIsInvalid | EntityNotCreated,
        Omit<TokenResponseDto, 'refreshToken'>
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ValidateTokenRepository')
    private validateTokenRepository: ValidateTokenRepository,
    @Inject('GenerateTokenRepository')
    private generateTokenRespository: GenerateTokenRepository
  ) {}
  async execute(
    input: TokenDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityIsInvalid | EntityNotCreated,
      Omit<TokenResponseDto, 'refreshToken'>
    >
  > {
    const { token, userId } = input;

    if (Object.keys(token).length < 1) {
      return left(new EntityNotEmpty('token'));
    }

    if (Object.keys(userId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    const userVerification = await UserVerificationId(
      userId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const validatedUserToken = await this.validateTokenRepository.validate({
      token,
      secret: process.env['JWT_REFRESH_SECRET'] ?? '',
    });

    if (
      Object.keys(validatedUserToken).length < 1 ||
      userId !== validatedUserToken.userId
    ) {
      return left(new EntityIsInvalid('user or token'));
    }

    const generatedAccessToken = await this.generateTokenRespository.generate({
      email: validatedUserToken.email,
      userId,
      secret: process.env['JWT_ACCESS_SECRET'] ?? '',
      expiresIn: process.env['JWT_ACCESS_EXPIRATION_IN'] ?? '',
    });

    if (Object.keys(generatedAccessToken).length < 1) {
      return left(new EntityNotCreated('token'));
    }

    return right({ accessToken: generatedAccessToken });
  }
}
