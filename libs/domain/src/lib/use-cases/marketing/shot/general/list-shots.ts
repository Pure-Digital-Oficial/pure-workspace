import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  FindUserByIdRepository,
  ListShotsRepository,
} from '../../../../repositories';
import { ListShotsDto, ListShotsResponseDto } from '../../../../dtos';
import { EntityNotEmpty, EntityNotExists } from '../../../../errors';
import { UserVerificationId } from '../../../../utils';

export class ListShots
  implements
    UseCase<
      ListShotsDto,
      Either<EntityNotEmpty | EntityNotExists, ListShotsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListShotsRepository')
    private listShotsRepository: ListShotsRepository
  ) {}

  async execute(
    input: ListShotsDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, ListShotsResponseDto>> {
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

    const listShotsResult = await this.listShotsRepository.list(input);

    return right(listShotsResult);
  }
}
