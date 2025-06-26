import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { DeleteTargetDto } from '../../../dtos';
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

export class DeleteTarget
  implements
    UseCase<
      DeleteTargetDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
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
    input: DeleteTargetDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { id, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
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

    const verifiedUserInTarget = await this.findUserInTargetRepository.find({
      targetId: id,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInTarget).length < 1) {
      return left(new EntityIsInvalid('Target'));
    }

    const deletedTrigger = await this.deleteTargetRepository.delete(input);

    if (Object.keys(deletedTrigger).length < 1) {
      return left(new EntityNotDeleted('Target'));
    }

    return right(deletedTrigger);
  }
}
