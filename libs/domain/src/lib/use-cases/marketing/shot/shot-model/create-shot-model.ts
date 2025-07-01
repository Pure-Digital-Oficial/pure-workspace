import { CreateShotModelDto } from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import { EntityNotCreated, EntityNotEmpty } from '../../../../errors';
import {
  CreateShotModelRepository,
  FindUserByIdRepository,
} from '../../../../repositories';
import { Inject } from '@nestjs/common';
import { UserVerificationId } from '../../../../utils';

export class CreateShotModel
  implements UseCase<CreateShotModelDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('CreateShotModelRepository')
    private createShotModelRepository: CreateShotModelRepository
  ) {}
  async execute(
    input: CreateShotModelDto
  ): Promise<Either<EntityNotEmpty, string>> {
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

    const createdShotModel = await this.createShotModelRepository.create(input);

    if (Object.keys(createdShotModel)) {
      return left(new EntityNotCreated('shot model'));
    }

    return right(createdShotModel);
  }
}
