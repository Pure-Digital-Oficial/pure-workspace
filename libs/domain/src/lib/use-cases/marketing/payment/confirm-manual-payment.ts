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
  FindPaymentPlataformByIdRepository,
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
    @Inject('FindPaymentPlataformByIdRepository')
    private findPaymentPlataformByIdRepository: FindPaymentPlataformByIdRepository,
    @Inject('ConfirmManualPaymentRepository')
    private confirmManualPaymentRepository: ConfirmManualPaymentRepository
  ) {}
  async execute(
    input: ConfirmManualPaymentDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotConfirmed, string>
  > {
    const { customerId, loggedUserId, paymentPlataformId } = input;

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

    const findedPaymentPlataform =
      await this.findPaymentPlataformByIdRepository.find(paymentPlataformId);

    if (
      Object.keys(findedPaymentPlataform?.id ?? findedPaymentPlataform).length <
      1
    ) {
      return left(new EntityNotExists('Payment Plataform'));
    }

    const confirmPayment = await this.confirmManualPaymentRepository.confirm({
      externalId: findedPaymentHistory.externalId,
      secretKey: findedPaymentPlataform.secretKey,
    });

    if (Object.keys(confirmPayment).length < 1) {
      return left(new EntityNotConfirmed('Payment'));
    }

    return right(confirmPayment);
  }
}
