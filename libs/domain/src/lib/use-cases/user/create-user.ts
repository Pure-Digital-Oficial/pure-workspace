import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { CreateUserDto } from '../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '../../errors';
import type {
  CreateUserRepository,
  FindAppByIdRepository,
  FindUserByNicknameRepository,
} from '../../repositories';

export class CreateUser
  implements UseCase<CreateUserDto, Either<InsufficientCharacters, string>>
{
  constructor(
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('FindUserByNicknameRepository')
    private findUserByNicknameRepository: FindUserByNicknameRepository,
    @Inject('CreateUserRepository')
    private createUserRepository: CreateUserRepository
  ) {}
  async execute(
    input: CreateUserDto
  ): Promise<Either<InsufficientCharacters, string>> {
    const {
      appId,
      body: { name, nickname },
    } = input;
    if (Object.keys(name).length < 1 || name.length < 3) {
      return left(new InsufficientCharacters('name'));
    }
    if (Object.keys(nickname).length < 1 || nickname.length < 3) {
      return left(new InsufficientCharacters('nickName'));
    }

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

    const filteredUser = await this.findUserByNicknameRepository.find(nickname);

    if (Object.keys(filteredUser?.id ?? filteredUser).length > 0) {
      return left(new EntityAlreadyExists(nickname));
    }

    const createdUser = await this.createUserRepository.create(input);

    if (Object.keys(createdUser).length < 1) {
      return left(new EntityNotCreated('User'));
    }

    return right(createdUser);
  }
}
