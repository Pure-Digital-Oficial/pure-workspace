import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { EditFixedGainDto } from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import { UserVerificationId } from '../../../utils';
import {
  FindFixedGainByNameAndValueRepository,
  FindUserByIdRepository,
  EditFixedGainRepository,
  FindFixedGaindByIdRepository,
} from '../../../repositories';

export class EditFixedGain
  implements
    UseCase<
      EditFixedGainDto,
      Either<
        | EntityNotEmpty
        | EntityNotExists
        | EntityAlreadyExists
        | EntityNotEdited,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindFixedGainByNameAndValueRepository')
    private findFixedGainByNameAndValueRepository: FindFixedGainByNameAndValueRepository,
    @Inject('FindFixedGaindByIdRepository')
    private findFixedGainByIdRepository: FindFixedGaindByIdRepository,
    @Inject('EditFixedGainRepository')
    private editFixedGainRepository: EditFixedGainRepository
  ) {}
  async execute(
    input: EditFixedGainDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityAlreadyExists | EntityNotEdited,
      string
    >
  > {
    const { dayOfReceipt, frequency, id, loggedUserId, name, value } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('ID'));
    }

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

    const findedFixedGainByNameAndValue =
      await this.findFixedGainByNameAndValueRepository.find({
        value,
        name,
        loggedUserId,
      });

    if (
      Object.keys(
        findedFixedGainByNameAndValue.id ?? findedFixedGainByNameAndValue
      ).length > 0 &&
      findedFixedGainByNameAndValue.id !== id
    ) {
      return left(new EntityAlreadyExists('fixed gain name and value'));
    }

    const findedFixedGainById = await this.findFixedGainByIdRepository.find(id);

    if (
      Object.keys(findedFixedGainById?.id ?? findedFixedGainById).length < 1
    ) {
      return left(new EntityNotExists('fixed gain'));
    }

    const editedFixedGain = await this.editFixedGainRepository.edit(input);

    if (Object.keys(editedFixedGain).length < 1) {
      return left(new EntityNotEdited('fixed gain'));
    }

    return right(editedFixedGain);
  }
}
