import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  FindUserByIdRepository,
  ListShotModelsRepository,
} from '../../../../repositories';
import { ListShotModelsDto, ListShotModelsResponseDto } from '../../../../dtos';
import { EntityNotEmpty, EntityNotExists } from '../../../../errors';
import { UserVerificationId } from '../../../../utils';

export class ListShotModels
  implements
    UseCase<
      ListShotModelsDto,
      Either<EntityNotEmpty | EntityNotExists, ListShotModelsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListShotModelsRepository')
    private listShotModelsRepository: ListShotModelsRepository
  ) {}

  async execute(
    input: ListShotModelsDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists, ListShotModelsResponseDto>
  > {
    const { loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const listShotModelsResult = await this.listShotModelsRepository.list(
      input
    );

    return right(listShotModelsResult);
  }
}
