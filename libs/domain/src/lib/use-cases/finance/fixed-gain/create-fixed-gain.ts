import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { CreateFixedGainDto } from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  FindUserByIdRepository,
  FindFixedGainByNameAndValueRepository,
  CreateFixedGainRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class CreateFixedGain
  implements
    UseCase<
      CreateFixedGainDto,
      Either<
        | EntityNotEmpty
        | EntityNotExists
        | EntityAlreadyExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindFixedGainByNameAndValueRepository')
    private findFixedGainByNameAndValueRepository: FindFixedGainByNameAndValueRepository,
    @Inject('CreateFixedGainRepository')
    private createFixedGainRepository: CreateFixedGainRepository
  ) {}
  async execute(
    input: CreateFixedGainDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityAlreadyExists | EntityNotCreated,
      string
    >
  > {
    const { dayOfReceipt, loggedUserId, name, value, frequency } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(frequency).length < 1) {
      return left(new EntityNotEmpty('frequency'));
    }

    if (dayOfReceipt < 0.1) {
      return left(new EntityNotEmpty('day of receipt'));
    }

    if (value < 0.1) {
      return left(new EntityNotEmpty('value'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedFixedGain =
      await this.findFixedGainByNameAndValueRepository.find({
        value,
        name,
        loggedUserId,
      });

    if (Object.keys(findedFixedGain.id ?? findedFixedGain).length > 0) {
      return left(new EntityAlreadyExists('fixed gain'));
    }

    const createdFixedGain = await this.createFixedGainRepository.create(input);

    if (Object.keys(createdFixedGain).length < 1) {
      return left(new EntityNotCreated('fixed gain'));
    }

    return right(createdFixedGain);
  }
}
