import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { CreateTargetsDto } from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  FindUserByIdRepository,
  FindTriggerByIdRepository,
  FindTargetByContentRepository,
  CreateUniqueTargetRepository,
} from '../../../repositories';

export class CreateTargets
  implements
    UseCase<
      CreateTargetsDto,
      Either<EntityNotEmpty | EntityNotCreated | EntityNotExists, string[]>
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
    input: CreateTargetsDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotCreated | EntityNotExists, string[]>
  > {
    const { contents, triggerId, loggedUserId } = input;

    if (Object.keys(triggerId).length < 1) {
      return left(new EntityNotEmpty('trigger ID'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (contents.length < 1) {
      return left(new EntityNotEmpty('contents'));
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
    const outPutIds: string[] = [];

    for (const content of contents) {
      const findedTarget = await this.findTargetByContentRepository.find({
        entity: content,
        loggedUserId,
      });

      if (Object.keys(findedTarget?.id ?? findedTarget).length > 0) {
        return left(new EntityAlreadyExists('target'));
      }

      const createdTargets = await this.createUniqueTargetRepository.create({
        ...input,
        content,
      });

      if (Object.keys(createdTargets).length < 1) {
        return left(new EntityNotCreated('target'));
      }

      outPutIds.push(createdTargets);
    }

    return right(outPutIds);
  }
}
