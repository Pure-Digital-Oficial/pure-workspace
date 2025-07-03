import { CreateShotModelDto } from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../../../errors';
import {
  CreateShotModelRepository,
  FindShotModelBySubjectRepository,
  FindShotModelByTitleRepository,
  FindUserByIdRepository,
} from '../../../../repositories';
import { Inject } from '@nestjs/common';
import { UserVerificationId } from '../../../../utils';

export class CreateShotModel
  implements
    UseCase<
      CreateShotModelDto,
      Either<EntityNotEmpty | EntityAlreadyExists | EntityNotCreated, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindShotModelByTitleRepository')
    private findShotModelByTitleRepository: FindShotModelByTitleRepository,
    @Inject('FindShotModelBySubjectRepository')
    private findShotModelBySubjectRepository: FindShotModelBySubjectRepository,
    @Inject('CreateShotModelRepository')
    private createShotModelRepository: CreateShotModelRepository
  ) {}
  async execute(
    input: CreateShotModelDto
  ): Promise<
    Either<EntityNotEmpty | EntityAlreadyExists | EntityNotCreated, string>
  > {
    const { body, loggedUserId, subject, title } = input;

    if (Object.keys(body).length < 1) {
      return left(new EntityNotEmpty('body IDs'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(subject).length < 1) {
      return left(new EntityNotEmpty('subject'));
    }

    if (Object.keys(title).length < 1) {
      return left(new EntityNotEmpty('title'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedShotModelTitle = await this.findShotModelByTitleRepository.find(
      {
        entity: title,
        loggedUserId,
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
      });

    if (
      Object.keys(findedShotModelSubject?.id ?? findedShotModelSubject).length >
      0
    ) {
      return left(new EntityAlreadyExists('shot model subject'));
    }

    const createdShotModel = await this.createShotModelRepository.create(input);

    if (Object.keys(createdShotModel).length < 1) {
      return left(new EntityNotCreated('shot model'));
    }

    return right(createdShotModel);
  }
}
