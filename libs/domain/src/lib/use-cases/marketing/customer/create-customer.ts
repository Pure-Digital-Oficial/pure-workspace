import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { CreateCustomerDto } from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  CreateCustomerRepository,
  FindCustomerByExternalIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class CreateCustomer
  implements
    UseCase<
      CreateCustomerDto,
      Either<EntityNotEmpty | EntityNotExists | EntityAlreadyExists, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCustomerByExternalIdRepository')
    private findCustomerByExternalIdRepository: FindCustomerByExternalIdRepository,
    @Inject('CreateCustomerRepository')
    private createCustomerRepository: CreateCustomerRepository
  ) {}

  async execute(
    input: CreateCustomerDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityAlreadyExists, string>
  > {
    const { loggedUserId, name, externalId, language } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(externalId).length < 1) {
      return left(new EntityNotEmpty('External ID'));
    }

    if (Object.keys(language).length < 1) {
      return left(new EntityNotEmpty('Language'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const customerAlreadyExists =
      await this.findCustomerByExternalIdRepository.find(externalId);

    if (
      Object.keys(customerAlreadyExists.id ?? customerAlreadyExists).length > 0
    ) {
      return left(
        new EntityAlreadyExists('Customer with this external ID already exists')
      );
    }

    const createdCustomerId = await this.createCustomerRepository.create(input);

    if (Object.keys(createdCustomerId).length < 1) {
      return left(new EntityNotCreated('Customer'));
    }

    return right(createdCustomerId);
  }
}
