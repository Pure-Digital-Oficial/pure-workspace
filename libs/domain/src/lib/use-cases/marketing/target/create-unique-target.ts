import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { CreateUniqueTargetDto } from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  InsufficientCharacters,
  EntityNotExists,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  FindUserByIdRepository,
  FindTriggerByIdRepository,
  FindTargetByContentRepository,
  CreateUniqueTargetRepository,
} from '../../../repositories';

export class CreateUniqueTarget
  implements
    UseCase<
      CreateUniqueTargetDto,
      Either<
        | InsufficientCharacters
        | EntityNotEmpty
        | EntityNotCreated
        | EntityNotExists,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindTriggerByIdRepository')
    private findTriggerByIdRepository: FindTriggerByIdRepository,
    @Inject('FindTargetByContentRepository')
    private findTargetByContentRepository: FindTargetByContentRepository,
    @Inject('CreateUniqueTargetRepository')
    private createUniqueTargetRepository: CreateUniqueTargetRepository
  ) {}
  async execute(
    input: CreateUniqueTargetDto
  ): Promise<
    Either<
      | InsufficientCharacters
      | EntityNotEmpty
      | EntityNotCreated
      | EntityNotExists,
      string
    >
  > {
    const { content, triggerId, loggedUserId } = input;

    if (Object.keys(triggerId).length < 1) {
      return left(new EntityNotEmpty('trigger ID'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(content).length < 1) {
      return left(new InsufficientCharacters('content'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedTriggerById = await this.findTriggerByIdRepository.find(
      triggerId
    );

    if (Object.keys(findedTriggerById?.id ?? findedTriggerById).length < 1) {
      return left(new EntityNotExists('trigger ID'));
    }

    const findedTarget = await this.findTargetByContentRepository.find({
      entity: content,
      loggedUserId,
    });

    if (Object.keys(findedTarget?.id ?? findedTarget).length > 0) {
      return left(new EntityAlreadyExists('target'));
    }

    const createdTrigger = await this.createUniqueTargetRepository.create(
      input
    );

    if (Object.keys(createdTrigger).length < 1) {
      return left(new EntityNotCreated('target'));
    }

    return right(createdTrigger);
  }
}
