import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  ListHistoryShotsRepository,
} from '../../../../repositories';
import {
  ListHistoryShotsDto,
  ListHistoryShotsResponseDto,
} from '../../../../dtos';
import {
  EntityNotEmpty,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../../errors';
import { UserVerificationId } from '../../../../utils';

export class ListHistoryShots
  implements
    UseCase<
      ListHistoryShotsDto,
      Either<
        EntityNotEmpty | EntityNotExists | EntityIsInvalid,
        ListHistoryShotsResponseDto
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInShotRepository')
    private findUserInShotRepository: FindUserInShotRepository,
    @Inject('ListHistoryShotsRepository')
    private listHistoryShotsRepository: ListHistoryShotsRepository
  ) {}

  async execute(
    input: ListHistoryShotsDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityIsInvalid,
      ListHistoryShotsResponseDto
    >
  > {
    const { loggedUserId, shotId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(shotId).length < 1) {
      return left(new EntityNotEmpty('Shot ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const verifiedUserInShot = await this.findUserInShotRepository.find({
      shotId: shotId,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInShot).length < 1) {
      return left(new EntityIsInvalid('Shot or User'));
    }

    const listShotsResult = await this.listHistoryShotsRepository.list(input);

    return right(listShotsResult);
  }
}
