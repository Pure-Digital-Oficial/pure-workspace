import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { EditTargetDto } from '../../../dtos';
import {
  EntityNotEdited,
  EntityNotEmpty,
  EntityIsInvalid,
  InsufficientCharacters,
  EntityAlreadyExists,
  EntityNotExists,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  EditTargetRepository,
  FindTargetByContentRepository,
  FindTriggerByIdRepository,
  FindUserByIdRepository,
  FindUserInTargetRepository,
} from '../../../repositories';

export class EditTarget
  implements
    UseCase<
      EditTargetDto,
      Either<
        | InsufficientCharacters
        | EntityNotEmpty
        | EntityNotExists
        | EntityNotEdited,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInTargetRepository')
    private findUserInTargetRepository: FindUserInTargetRepository,
    @Inject('FindTriggerByIdRepository')
    private findTriggerByIdRepository: FindTriggerByIdRepository,
    @Inject('FindTargetByContentRepository')
    private findTargetByContentRepository: FindTargetByContentRepository,
    @Inject('EditTargetRepository')
    private editTargetRepository: EditTargetRepository
  ) {}
  async execute(
    input: EditTargetDto
  ): Promise<
    Either<
      | InsufficientCharacters
      | EntityNotEmpty
      | EntityNotExists
      | EntityNotEdited,
      string
    >
  > {
    const { id, triggerId, loggedUserId, content } = input;

    if (Object.keys(content).length < 1) {
      return left(new InsufficientCharacters('content'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(triggerId).length < 1) {
      return left(new EntityNotEmpty('Trigger ID'));
    }

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('ID'));
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
      return left(new EntityNotExists('Trigger ID'));
    }

    const verifiedUserInTarget = await this.findUserInTargetRepository.find({
      targetId: id,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInTarget).length < 1) {
      return left(new EntityIsInvalid('Target or User'));
    }

    const findedTarget = await this.findTargetByContentRepository.find({
      entity: content,
      loggedUserId,
      id,
    });

    if (Object.keys(findedTarget?.id ?? findedTarget).length > 0) {
      return left(new EntityAlreadyExists('Target Content'));
    }

    const editedTarget = await this.editTargetRepository.edit(input);

    if (Object.keys(editedTarget).length < 1) {
      return left(new EntityNotEdited('Target'));
    }

    return right(editedTarget);
  }
}
