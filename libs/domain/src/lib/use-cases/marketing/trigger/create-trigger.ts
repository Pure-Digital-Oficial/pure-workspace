import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { CreateTriggerDto } from '../../../dtos';
import {
  EntityNotCreated,
  EntityNotEmpty,
  InsufficientCharacters,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  CreateTriggerRepository,
  FindUserByIdRepository,
} from '../../../repositories';

export class CreateTrigger
  implements
    UseCase<
      CreateTriggerDto,
      Either<InsufficientCharacters | EntityNotEmpty | EntityNotCreated, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('CreateTriggerRepository')
    private createTriggerRepository: CreateTriggerRepository
  ) {}
  async execute(
    input: CreateTriggerDto
  ): Promise<
    Either<InsufficientCharacters | EntityNotEmpty | EntityNotCreated, string>
  > {
    const { content, description, loggedUserId, name, type } = input;
    if (Object.keys(name).length < 1 || name.length < 3) {
      return left(new InsufficientCharacters('name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new InsufficientCharacters('description'));
    }

    if (Object.keys(content).length < 1) {
      return left(new InsufficientCharacters('content'));
    }

    if (Object.keys(type).length < 1) {
      return left(new EntityNotEmpty('type'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const createdTrigger = await this.createTriggerRepository.create(input);

    if (Object.keys(createdTrigger).length < 1) {
      return left(new EntityNotCreated('trigger'));
    }

    return right(createdTrigger);
  }
}
