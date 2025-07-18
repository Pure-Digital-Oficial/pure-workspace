import { CreateShotDto } from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  CreateShotRepository,
  FindShotByTitleRepository,
  FindUserByIdRepository,
  FindShotModelByIdRepository,
} from '../../../../repositories';
import { Inject } from '@nestjs/common';
import { UserVerificationId } from '../../../../utils';

export class CreateShot
  implements
    UseCase<
      CreateShotDto,
      Either<
        | EntityNotEmpty
        | EntityAlreadyExists
        | EntityNotExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindShotByTitleRepository')
    private findShotByTitleRepository: FindShotByTitleRepository,
    @Inject('FindShotModelByIdRepository')
    private findShotModelByIdRepository: FindShotModelByIdRepository,
    @Inject('CreateShotRepository')
    private createShotRepository: CreateShotRepository
  ) {}
  async execute(
    input: CreateShotDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityAlreadyExists | EntityNotExists | EntityNotCreated,
      string
    >
  > {
    const { loggedUserId, title, modelId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(modelId).length < 1) {
      return left(new EntityNotEmpty('model ID'));
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

    const findedShotTitle = await this.findShotByTitleRepository.find({
      entity: title,
      loggedUserId,
    });

    if (Object.keys(findedShotTitle.id ?? findedShotTitle).length > 0) {
      return left(new EntityAlreadyExists('shot title'));
    }

    const findedShotModel = await this.findShotModelByIdRepository.find(
      modelId
    );

    if (Object.keys(findedShotModel.id ?? findedShotModel).length < 1) {
      return left(new EntityNotExists('shot model'));
    }

    const createdShot = await this.createShotRepository.create(input);

    if (Object.keys(createdShot).length < 1) {
      return left(new EntityNotCreated('shot'));
    }

    return right(createdShot);
  }
}
