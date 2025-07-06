import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../errors';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  DeleteShotRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';
import { DeleteShotDto } from '../../../dtos';

export class DeleteShot
  implements
    UseCase<
      DeleteShotDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInShotRepository')
    private findUserInShotRepository: FindUserInShotRepository,
    @Inject('DeleteShotRepository')
    private deleteShotRepository: DeleteShotRepository
  ) {}
  async execute(
    input: DeleteShotDto
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

    const verifiedUserInShot = await this.findUserInShotRepository.find({
      shotId: id,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInShot).length < 1) {
      return left(new EntityIsInvalid('Shot or User'));
    }

    const deletedShotModel = await this.deleteShotRepository.delete(input);

    if (Object.keys(deletedShotModel).length < 1) {
      return left(new EntityNotDeleted('Shot'));
    }

    return right(deletedShotModel);
  }
}
