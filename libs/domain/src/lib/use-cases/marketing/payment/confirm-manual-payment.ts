import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { ConfirmManualPaymentDto } from '../../../dtos';
import {
  EntityNotConfirmed,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  ConfirmManualPaymentRepository,
  FindCustomerByIdRepository,
  FindPaymentHistoryByCustomerIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class ConfirmManualPayment
  implements
    UseCase<
      ConfirmManualPaymentDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotConfirmed, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCustomerByIdRepository')
    private findCustomerByIdRepository: FindCustomerByIdRepository,
    @Inject('FindPaymentHistoryByCustomerIdRepository')
    private findPaymentHistoryByCustomerIdRepository: FindPaymentHistoryByCustomerIdRepository,
    @Inject('ConfirmManualPaymentRepository')
    private confirmManualPaymentRepository: ConfirmManualPaymentRepository
  ) {}
  async execute(
    input: ConfirmManualPaymentDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotConfirmed, string>
  > {
    const { customerId, loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(customerId).length < 1) {
      return left(new EntityNotEmpty('Customer ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedCustomer = await this.findCustomerByIdRepository.find(
      customerId
    );

    if (Object.keys(findedCustomer?.id ?? findedCustomer).length < 1) {
      return left(new EntityNotExists('Customer'));
    }

    const findedPaymentHistory =
      await this.findPaymentHistoryByCustomerIdRepository.find(customerId);

    if (
      Object.keys(findedPaymentHistory?.id ?? findedPaymentHistory).length < 1
    ) {
      return left(new EntityNotExists('Payment History'));
    }

    const confirmPayment = await this.confirmManualPaymentRepository.confirm({
      externalId: findedPaymentHistory.externalId,
    });

    if (Object.keys(confirmPayment).length < 1) {
      return left(new EntityNotConfirmed('Payment'));
    }

    return right(confirmPayment);
  }
}
