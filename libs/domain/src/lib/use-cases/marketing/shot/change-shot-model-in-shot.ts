import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { ChangeShotModelInShotDto } from '../../../dtos';
import {
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  FindUserInShotRepository,
  FindShotModelByIdRepository,
  FindUserByIdRepository,
  ChangeShotModelInShotRepository,
} from '../../../repositories';

export class ChangeShotModelInShot
  implements
    UseCase<
      ChangeShotModelInShotDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotEdited, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInShotRepository')
    private findUserInShotRepository: FindUserInShotRepository,
    @Inject('FindShotModelByIdRepository')
    private findShotModelByIdRepository: FindShotModelByIdRepository,
    @Inject('ChangeShotModelInShotRepository')
    private changeShotModelInShotRepository: ChangeShotModelInShotRepository
  ) {}
  async execute(
    input: ChangeShotModelInShotDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotEdited, string>
  > {
    const { loggedUserId, modelId, shotId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(modelId).length < 1) {
      return left(new EntityNotEmpty('Shot model ID'));
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
      shotId,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInShot).length < 1) {
      return left(new EntityIsInvalid('Shot or User'));
    }

    const findedShotModel = await this.findShotModelByIdRepository.find(
      modelId
    );

    if (Object.keys(findedShotModel.id ?? findedShotModel).length < 1) {
      return left(new EntityNotExists('shot model'));
    }

    const changedShotModel = await this.changeShotModelInShotRepository.change(
      input
    );

    if (Object.keys(changedShotModel).length < 1) {
      return left(new EntityNotEdited('Shot Model'));
    }

    return right(changedShotModel);
  }
}
