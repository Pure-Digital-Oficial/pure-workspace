import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { EditTriggerDto } from '../../../dtos';
import {
  EntityNotEdited,
  EntityNotEmpty,
  EntityIsInvalid,
  InsufficientCharacters,
  EntityAlreadyExists,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  EditTriggerRepository,
  FindTriggerByContentRepository,
  FindTriggerByNameRepository,
  FindUserByIdRepository,
  FindUserInTriggerRepository,
} from '../../../repositories';

export class EditTrigger
  implements
    UseCase<
      EditTriggerDto,
      Either<InsufficientCharacters | EntityNotEmpty | EntityNotEdited, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserInTriggerRepository')
    private findUserInTriggerRepository: FindUserInTriggerRepository,
    @Inject('FindTriggerByNameRepository')
    private findTriggerByNameRepository: FindTriggerByNameRepository,
    @Inject('FindTriggerByContentRepository')
    private findTriggerByContentRepository: FindTriggerByContentRepository,
    @Inject('EditTriggerRepository')
    private editTriggerRepository: EditTriggerRepository
  ) {}
  async execute(
    input: EditTriggerDto
  ): Promise<
    Either<InsufficientCharacters | EntityNotEmpty | EntityNotEdited, string>
  > {
    const {
      id,
      loggedUserId,
      body: { content, description, name, type },
    } = input;
    if (Object.keys(name).length < 1 || name.length < 3) {
      return left(new InsufficientCharacters('name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new InsufficientCharacters('description'));
    }

    if (Object.keys(content).length < 1) {
      return left(new InsufficientCharacters('content'));
    }

    if (Object.keys(type).length < 1) {
      return left(new EntityNotEmpty('type'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const verifiedUserInTrigger = await this.findUserInTriggerRepository.find({
      id,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInTrigger).length < 1) {
      return left(new EntityIsInvalid('Trigger'));
    }

    const findedTriggerByName = await this.findTriggerByNameRepository.find({
      entity: name,
      loggedUserId,
      id,
    });

    if (
      Object.keys(findedTriggerByName?.id ?? findedTriggerByName).length > 0
    ) {
      return left(new EntityAlreadyExists('name'));
    }

    const findedTriggerByContent =
      await this.findTriggerByContentRepository.find({
        entity: content,
        loggedUserId,
        id,
      });

    if (
      Object.keys(findedTriggerByContent?.id ?? findedTriggerByContent).length >
      0
    ) {
      return left(new EntityAlreadyExists('content'));
    }

    const editedTrigger = await this.editTriggerRepository.edit(input);

    if (Object.keys(editedTrigger).length < 1) {
      return left(new EntityNotEdited('trigger'));
    }

    return right(editedTrigger);
  }
}
