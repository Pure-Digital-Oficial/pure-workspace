import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { GetSessionDto, SessionResponseDto } from '../../dtos';
import { EntityIsInvalid, EntityNotEmpty, EntityNotExists } from '../../errors';
import {
  FindAppByIdRepository,
  GetSessionRepository,
  ValidateTokenRepository,
} from '../../repositories';
import { AppVerificationId } from '../../utils';

export class GetSession
  implements UseCase<GetSessionDto, Either<EntityNotEmpty, SessionResponseDto>>
{
  constructor(
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('ValidateTokenRepository')
    private validateTokenRepository: ValidateTokenRepository,
    @Inject('GetSessionRepository')
    private getSessionRepository: GetSessionRepository
  ) {}
  async execute(
    input: GetSessionDto
  ): Promise<Either<EntityNotEmpty, SessionResponseDto>> {
    const { accessToken, appId } = input;

    if (Object.keys(accessToken).length < 1) {
      return left(new EntityNotEmpty('Token'));
    }

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('App ID'));
    }

    const appVerification = await AppVerificationId(
      appId,
      this.findAppByIdRepository
    );

    if (appVerification.isLeft()) {
      return left(appVerification.value);
    }

    const validatedUserToken = await this.validateTokenRepository.validate({
      token: accessToken,
      secret: process.env['JWT_ACCESS_SECRET'] ?? '',
    });

    if (Object.keys(validatedUserToken).length < 1) {
      return left(new EntityIsInvalid('Token'));
    }

    const session = await this.getSessionRepository.get(
      validatedUserToken.userId
    );

    if (Object.keys(session?.id ?? session).length < 1) {
      return left(new EntityNotExists('User'));
    }

    return right({
      ...session,
      loggedAppId: appId,
    });
  }
}
