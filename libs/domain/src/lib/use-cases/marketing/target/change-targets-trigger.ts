import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { ChangeTargetsTriggerDto } from '../../../dtos';
import {
  EntityNotEdited,
  EntityNotEmpty,
  InsufficientCharacters,
  EntityNotExists,
  EntityIsInvalid,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  FindTriggerByIdRepository,
  FindUserInTargetRepository,
  FindUserByIdRepository,
  ChangeTargetTriggerRepository,
} from '../../../repositories';

export class ChangeTargetsTrigger
  implements
    UseCase<
      ChangeTargetsTriggerDto,
      Either<
        | InsufficientCharacters
        | EntityNotEmpty
        | EntityNotExists
        | EntityNotEdited,
        string[]
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindTriggerByIdRepository')
    private findTriggerByIdRepository: FindTriggerByIdRepository,
    @Inject('FindUserInTargetRepository')
    private findUserInTargetRepository: FindUserInTargetRepository,
    @Inject('ChangetTargetTriggerRepository')
    private changeTargetTriggerRepository: ChangeTargetTriggerRepository
  ) {}
  async execute(
    input: ChangeTargetsTriggerDto
  ): Promise<
    Either<
      | InsufficientCharacters
      | EntityNotEmpty
      | EntityNotExists
      | EntityNotEdited,
      string[]
    >
  > {
    const { loggedUserId, triggerId, targetsIds } = input;
    if (targetsIds.length < 1) {
      return left(new EntityNotEmpty('targets IDs'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(triggerId).length < 1) {
      return left(new EntityNotEmpty('Trigger ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const filteredTrigger = await this.findTriggerByIdRepository.find(
      triggerId
    );

    if (Object.keys(filteredTrigger?.id ?? filteredTrigger).length < 1) {
      return left(new EntityNotExists('trigger ID'));
    }

    const targetsIdsList: string[] = [];

    for (const targetId of targetsIds) {
      const filteredTarget = await this.findUserInTargetRepository.find({
        targetId,
        loggedUserId,
      });

      if (Object.keys(filteredTarget).length < 1) {
        return left(new EntityIsInvalid('Target or User'));
      }

      const changedTargets = await this.changeTargetTriggerRepository.change({
        targetId,
        triggerId,
      });

      if (changedTargets.length < 1) {
        return left(new EntityNotEdited('Targets'));
      }

      targetsIdsList.push(changedTargets);
    }

    return right(targetsIdsList);
  }
}
