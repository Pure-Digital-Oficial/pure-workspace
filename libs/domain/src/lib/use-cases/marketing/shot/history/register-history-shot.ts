import { RegisterHistoryShotDto } from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../../errors';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  FindUserInTargetRepository,
  RegisterHistoryShotRepository,
} from '../../../../repositories';
import { Inject } from '@nestjs/common';
import { UserVerificationId } from '../../../../utils';

export class RegisterHistoryShot
  implements
    UseCase<
      RegisterHistoryShotDto,
      Either<
        | EntityNotEmpty
        | EntityAlreadyExists
        | EntityNotExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInTargetRepository')
    private findUserInTargetRepository: FindUserInTargetRepository,
    @Inject('FindUserInShotRepository')
    private findUserInShotRepository: FindUserInShotRepository,
    @Inject('RegisterHistoryShotRepository')
    private registerHistoryShotRepository: RegisterHistoryShotRepository
  ) {}
  async execute(
    input: RegisterHistoryShotDto
  ): Promise<
    Either<
      | EntityNotEmpty
      | EntityAlreadyExists
      | EntityNotExists
      | EntityIsInvalid
      | EntityNotCreated,
      string
    >
  > {
    const { loggedUserId, targetId, shotId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(targetId).length < 1) {
      return left(new EntityNotEmpty('Target ID'));
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

    const verifiedUserInTarget = await this.findUserInTargetRepository.find({
      targetId: targetId,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInTarget).length < 1) {
      return left(new EntityIsInvalid('Target or User'));
    }

    const verifiedUserInShot = await this.findUserInShotRepository.find({
      shotId: shotId,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInShot).length < 1) {
      return left(new EntityIsInvalid('Shot or User'));
    }

    const registeredShot = await this.registerHistoryShotRepository.register(
      input
    );

    if (Object.keys(registeredShot).length < 1) {
      return left(new EntityNotCreated('shot'));
    }

    return right(registeredShot);
  }
}
