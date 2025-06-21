import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { DeleteTriggerDto } from '../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../errors';
import {
  FindUserByIdRepository,
  FindUserInTriggerRepository,
  DeleteTriggerRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class DeleteTrigger
  implements
    UseCase<
      DeleteTriggerDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInTriggerRepository')
    private findUserInTriggerRepository: FindUserInTriggerRepository,
    @Inject('DeleteTriggerRepository')
    private deleteTriggerRepository: DeleteTriggerRepository
  ) {}
  async execute(
    input: DeleteTriggerDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { id, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('ID'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('Logged User ID'));
    }

    const userVerification = await UserVerificationId(
      id,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const verifiedUserInTrigger = await this.findUserInTriggerRepository.find({
      id,
      loggedUserId,
    });

    if (
      Object.keys(verifiedUserInTrigger.id ?? verifiedUserInTrigger).length < 1
    ) {
      return left(new EntityIsInvalid('Trigger'));
    }

    const deletedTrigger = await this.deleteTriggerRepository.delete(input);

    if (Object.keys(deletedTrigger).length < 1) {
      return left(new EntityNotDeleted('Trigger'));
    }

    return right(deletedTrigger);
  }
}
