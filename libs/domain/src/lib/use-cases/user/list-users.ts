import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { FindAppByIdRepository, ListUsersRepository } from '../../repositories';
import { ListUsersDto, ListUsersResponseDto } from '../../dtos';
import { EntityNotEmpty, EntityNotExists } from '../../errors';

export class ListUsers
  implements
    UseCase<
      ListUsersDto,
      Either<EntityNotEmpty | EntityNotExists, ListUsersResponseDto>
    >
{
  constructor(
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('ListUserRepository')
    private listUsersRepository: ListUsersRepository
  ) {}

  async execute(
    input: ListUsersDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, ListUsersResponseDto>> {
    const { appId } = input;

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('app id'));
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists('app ID'));
    }

    const listUserResult = await this.listUsersRepository.list(input);

    return right(listUserResult);
  }
}
