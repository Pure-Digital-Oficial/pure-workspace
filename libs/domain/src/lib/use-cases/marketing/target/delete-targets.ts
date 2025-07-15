import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { DeleteTargetsDto } from '../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../errors';
import {
  FindUserByIdRepository,
  FindUserInTargetRepository,
  DeleteTargetRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class DeleteTargets
  implements
    UseCase<
      DeleteTargetsDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string[]>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInTargetRepository')
    private findUserInTargetRepository: FindUserInTargetRepository,
    @Inject('DeleteTargetRepository')
    private deleteTargetRepository: DeleteTargetRepository
  ) {}
  async execute(
    input: DeleteTargetsDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string[]>
  > {
    const { ids, loggedUserId } = input;

    if (ids.length < 1) {
      return left(new EntityNotEmpty('ID'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }
    const outPutIds: string[] = [];

    for (const targetId of ids) {
      const verifiedUserInTarget = await this.findUserInTargetRepository.find({
        targetId,
        loggedUserId,
      });

      if (Object.keys(verifiedUserInTarget).length < 1) {
        return left(new EntityIsInvalid('Target'));
      }

      const deletedTarget = await this.deleteTargetRepository.delete({
        ...input,
        id: targetId,
      });

      if (Object.keys(deletedTarget).length < 1) {
        return left(new EntityNotDeleted('Target'));
      }

      outPutIds.push(deletedTarget);
    }

    return right(outPutIds);
  }
}
