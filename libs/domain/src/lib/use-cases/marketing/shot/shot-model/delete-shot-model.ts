import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import { DeleteShotModelDto } from '../../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../../errors';
import {
  FindUserByIdRepository,
  FindUserInShotModelRepository,
  DeleteTargetRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class DeleteShotModel
  implements
    UseCase<
      DeleteShotModelDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInShotModelRepository')
    private findUserInShotModelRepository: FindUserInShotModelRepository,
    @Inject('DeleteTargetRepository')
    private deleteTargetRepository: DeleteTargetRepository
  ) {}
  async execute(
    input: DeleteShotModelDto
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

    const verifiedUserInShotModel =
      await this.findUserInShotModelRepository.find({
        shotModelId: id,
        loggedUserId,
      });

    if (Object.keys(verifiedUserInShotModel).length < 1) {
      return left(new EntityIsInvalid('Shot Model'));
    }

    const deletedShotModel = await this.deleteTargetRepository.delete(input);

    if (Object.keys(deletedShotModel).length < 1) {
      return left(new EntityNotDeleted('Shot Model'));
    }

    return right(deletedShotModel);
  }
}
