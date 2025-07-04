import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import { EditShotModelDto } from '../../../../dtos';
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
  FindUserInShotModelRepository,
  FindShotModelByTitleRepository,
  FindShotModelBySubjectRepository,
  EditShotModelRepository,
} from '../../../../repositories';

export class EditShotModel
  implements
    UseCase<
      EditShotModelDto,
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
    @Inject('FindUserInShotModelRepository')
    private findUserInShotModelRepository: FindUserInShotModelRepository,
    @Inject('FindShotModelByTitleRepository')
    private findShotModelByTitleRepository: FindShotModelByTitleRepository,
    @Inject('FindShotModelBySubjectRepository')
    private findShotModelBySubjectRepository: FindShotModelBySubjectRepository,
    @Inject('EditShotModelRepository')
    private editShotModelRepository: EditShotModelRepository
  ) {}
  async execute(
    input: EditShotModelDto
  ): Promise<
    Either<
      | InsufficientCharacters
      | EntityNotEmpty
      | EntityNotExists
      | EntityNotEdited,
      string
    >
  > {
    const { id, body, loggedUserId, subject, title } = input;

    if (Object.keys(title).length < 1) {
      return left(new EntityNotEmpty('title'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(body).length < 1) {
      return left(new EntityNotEmpty('body'));
    }

    if (Object.keys(subject).length < 1) {
      return left(new EntityNotEmpty('subject'));
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

    const verifiedUserInShotModel =
      await this.findUserInShotModelRepository.find({
        shotModelId: id,
        loggedUserId,
      });

    if (Object.keys(verifiedUserInShotModel).length < 1) {
      return left(new EntityIsInvalid('Shot Model or User'));
    }

    const findedShotModelTitle = await this.findShotModelByTitleRepository.find(
      {
        entity: title,
        loggedUserId,
        id,
      }
    );

    if (
      Object.keys(findedShotModelTitle.id ?? findedShotModelTitle).length > 0
    ) {
      return left(new EntityAlreadyExists('shot model title'));
    }

    const findedShotModelSubject =
      await this.findShotModelBySubjectRepository.find({
        entity: subject,
        loggedUserId,
        id,
      });

    if (
      Object.keys(findedShotModelSubject?.id ?? findedShotModelSubject).length >
      0
    ) {
      return left(new EntityAlreadyExists('shot model subject'));
    }

    const editedShotModel = await this.editShotModelRepository.edit(input);

    if (Object.keys(editedShotModel).length < 1) {
      return left(new EntityNotEdited('Shot Model'));
    }

    return right(editedShotModel);
  }
}
