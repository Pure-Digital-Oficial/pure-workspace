import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import { RegisterHistoryShotsDto } from '../../../../dtos';
import {
  EntityIsInvalid,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../../../errors';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  FindUserInTargetRepository,
  RegisterHistoryShotRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class RegisterHistoryShots
  implements UseCase<RegisterHistoryShotsDto, Either<EntityNotEmpty, string[]>>
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
    input: RegisterHistoryShotsDto
  ): Promise<Either<EntityNotEmpty, string[]>> {
    const { loggedUserId, shotId, targetsIds } = input;

    if (Object.keys(shotId).length < 1) {
      return left(new EntityNotEmpty('Shot ID'));
    }
    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (targetsIds.length < 1) {
      return left(new EntityNotEmpty('target ID'));
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

    const outPutIds: string[] = [];

    for (const targetId of targetsIds) {
      const verifiedUserInTarget = await this.findUserInTargetRepository.find({
        targetId: targetId,
        loggedUserId,
      });

      if (Object.keys(verifiedUserInTarget).length < 1) {
        return left(new EntityIsInvalid('Target or User'));
      }

      const registeredShot = await this.registerHistoryShotRepository.register({
        ...input,
        targetId,
      });

      if (Object.keys(registeredShot).length < 1) {
        return left(new EntityNotCreated('shot'));
      }

      outPutIds.push(registeredShot);
    }

    return right(outPutIds);
  }
}
