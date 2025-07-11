import { Inject } from '@nestjs/common';
import { RegisterHistoryShotsByShotDto } from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  FindTargetsByShotIdRepository,
  FindUserByIdRepository,
  RegisterHistoryShotRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class RegisterHistoryShotsByShot
  implements
    UseCase<RegisterHistoryShotsByShotDto, Either<EntityNotEmpty, string[]>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindTargetsByShotIdRepository')
    private findTargetsByShotIdRepository: FindTargetsByShotIdRepository,
    @Inject('RegisterHistoryShotRepository')
    private registerHistoryShotRepository: RegisterHistoryShotRepository
  ) {}
  async execute(
    input: RegisterHistoryShotsByShotDto
  ): Promise<Either<EntityNotEmpty, string[]>> {
    const { loggedUserId, shotId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }
    if (Object.keys(shotId).length < 1) {
      return left(new EntityNotEmpty('shot ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const targetsByShot = await this.findTargetsByShotIdRepository.find({
      entity: shotId,
      loggedUserId,
    });

    if (targetsByShot?.targets.length < 1) {
      return left(new EntityNotExists('Targets'));
    }
    const registeredHistoryShots: string[] = [];

    for (const target of targetsByShot.targets) {
      const resteredHistoryShot =
        await this.registerHistoryShotRepository.register({
          loggedUserId,
          shotId,
          targetId: target.id,
        });

      if (Object.keys(resteredHistoryShot).length < 1) {
        return left(new EntityNotCreated('History Shot'));
      }

      registeredHistoryShots.push(resteredHistoryShot);
    }

    return right(registeredHistoryShots);
  }
}
