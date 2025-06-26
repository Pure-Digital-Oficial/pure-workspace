import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import {
  FindUserByIdRepository,
  ListTriggersRepository,
} from '../../../repositories';
import { ListTriggersDto, ListTriggersResponseDto } from '../../../dtos';
import { EntityNotEmpty, EntityNotExists } from '../../../errors';
import { UserVerificationId } from '../../../utils';

export class ListTriggers
  implements
    UseCase<
      ListTriggersDto,
      Either<EntityNotEmpty | EntityNotExists, ListTriggersResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListTriggersRepository')
    private listTriggersRepository: ListTriggersRepository
  ) {}

  async execute(
    input: ListTriggersDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists, ListTriggersResponseDto>
  > {
    const { loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('Logged User ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const listTriggersResult = await this.listTriggersRepository.list(input);

    return right(listTriggersResult);
  }
}
