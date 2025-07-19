import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import { EditShotDto } from '../../../../dtos';
import {
  EntityNotEdited,
  EntityNotEmpty,
  EntityIsInvalid,
  InsufficientCharacters,
  EntityAlreadyExists,
  EntityNotExists,
} from '../../../../errors';
import { UserVerificationId } from '../../../../utils';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  FindShotByTitleRepository,
  FindShotModelByIdRepository,
  EditShotRepository,
} from '../../../../repositories';

export class EditShot
  implements
    UseCase<
      EditShotDto,
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
    @Inject('FindUserInShotRepository')
    private findUserInShotRepository: FindUserInShotRepository,
    @Inject('FindShotByTitleRepository')
    private findShotByTitleRepository: FindShotByTitleRepository,
    @Inject('FindShotModelByIdRepository')
    private findShotModelByIdRepository: FindShotModelByIdRepository,
    @Inject('EditShotRepository')
    private editShotRepository: EditShotRepository
  ) {}
  async execute(
    input: EditShotDto
  ): Promise<
    Either<
      | InsufficientCharacters
      | EntityNotEmpty
      | EntityNotExists
      | EntityNotEdited,
      string
    >
  > {
    const { id, loggedUserId, title, modelId } = input;

    if (Object.keys(title).length < 1) {
      return left(new EntityNotEmpty('title'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(modelId).length < 1) {
      return left(new EntityNotEmpty('model ID'));
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

    const verifiedUserInShot = await this.findUserInShotRepository.find({
      shotId: id,
      loggedUserId,
    });

    if (Object.keys(verifiedUserInShot).length < 1) {
      return left(new EntityIsInvalid('Shot or User'));
    }

    const findedShotTitle = await this.findShotByTitleRepository.find({
      entity: title,
      loggedUserId,
      id,
    });

    if (Object.keys(findedShotTitle.id ?? findedShotTitle).length > 0) {
      return left(new EntityAlreadyExists('shot title'));
    }

    const findedShotModel = await this.findShotModelByIdRepository.find(
      modelId
    );

    if (Object.keys(findedShotModel?.id ?? findedShotModel).length < 1) {
      return left(new EntityNotExists('shot model'));
    }

    const editedShot = await this.editShotRepository.edit(input);

    if (Object.keys(editedShot).length < 1) {
      return left(new EntityNotEdited('Shot'));
    }

    return right(editedShot);
  }
}
