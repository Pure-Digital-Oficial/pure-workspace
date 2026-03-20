import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { EditCustomerStatusDto } from '../../../dtos';
import { EntityNotEmpty, EntityNotExists } from '../../../errors';
import {
  EditCustomerStatusRepository,
  FindCustomerByIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class EditCustomerStatus
  implements UseCase<EditCustomerStatusDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCustomerByIdRepository')
    private findCustomerByIdRepository: FindCustomerByIdRepository,
    @Inject('EditCustomerStatusRepository')
    private editCustomerStatusRepository: EditCustomerStatusRepository
  ) {}
  async execute(
    input: EditCustomerStatusDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { id, status, loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('Customer ID'));
    }

    if (Object.keys(status).length < 1) {
      return left(new EntityNotEmpty('Status'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const customerVerification = await this.findCustomerByIdRepository.find(id);

    if (
      Object.keys(customerVerification.id ?? customerVerification).length < 1
    ) {
      return left(new EntityNotExists('Customer'));
    }

    const editedCustomerStatus = await this.editCustomerStatusRepository.edit(
      input
    );

    if (Object.keys(editedCustomerStatus).length < 1) {
      return left(new EntityNotExists('Customer'));
    }

    return right(editedCustomerStatus);
  }
}
