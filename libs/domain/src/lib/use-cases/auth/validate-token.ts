import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { ValidateTokenDto } from '../../dtos';
import { EntityIsInvalid, EntityNotEmpty, EntityNotExists } from '../../errors';
import {
  FindUserByIdRepository,
  ValidateTokenRepository,
} from '../../repositories';
import { UserVerificationId } from '../../utils';

export class ValidateToken
  implements
    UseCase<
      ValidateTokenDto,
      Either<EntityNotEmpty | EntityNotExists | EntityIsInvalid, boolean>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ValidateTokenRepository')
    private validateTokenRepository: ValidateTokenRepository
  ) {}
  async execute(
    input: ValidateTokenDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityIsInvalid, boolean>
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
      secret: process.env['JWT_ACCESS_SECRET'] ?? '',
    });

    if (
      Object.keys(validatedUserToken).length < 1 ||
      userId !== validatedUserToken
    ) {
      return left(new EntityIsInvalid('user or token'));
    }

    return right(true);
  }
}
