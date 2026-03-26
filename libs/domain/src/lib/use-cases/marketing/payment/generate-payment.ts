import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { GeneratePaymentDto, GeneratePaymentResponseDto } from '../../../dtos';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  FindPaymentMethodWithPlataformByIdsRepository,
  FindPaymentPlataformByIdRepository,
  FindPlanByIdRepository,
  FindUserByIdRepository,
  FindPaymentMethodByIdRepository,
  GeneratePaymentRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class GeneratePayment
  implements
    UseCase<
      GeneratePaymentDto,
      Either<
        EntityNotEmpty | EntityNotExists | EntityNotCreated,
        GeneratePaymentResponseDto
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPaymentPlataformByIdRepository')
    private findPaymentPlataformByIdRepository: FindPaymentPlataformByIdRepository,
    @Inject('FindPaymentMethodByIdRepository')
    private findPaymentMethodByIdRepository: FindPaymentMethodByIdRepository,
    @Inject('FindPlanByIdRepository')
    private findPlanByIdRepository: FindPlanByIdRepository,
    @Inject('FindPaymentMethodWithPlataformByIdsRepository')
    private findPaymentMethodWithPlataformByIdsRepository: FindPaymentMethodWithPlataformByIdsRepository,
    @Inject('GeneratePaymentRepository')
    private generatePaymentRepository: GeneratePaymentRepository
  ) {}
  async execute(
    input: GeneratePaymentDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityNotCreated,
      GeneratePaymentResponseDto
    >
  > {
    const {
      loggedUserId,
      paymentPlataformId,
      paymentMethodId,
      planId,
      payerEmail,
    } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(paymentPlataformId).length < 1) {
      return left(new EntityNotEmpty('Payment Plataform ID'));
    }

    if (Object.keys(paymentMethodId).length < 1) {
      return left(new EntityNotEmpty('Payment Method ID'));
    }

    if (Object.keys(planId).length < 1) {
      return left(new EntityNotEmpty('Plan ID'));
    }

    if (Object.keys(payerEmail).length < 1) {
      return left(new EntityNotEmpty('Payer Email'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedPaymentPlataform =
      await this.findPaymentPlataformByIdRepository.find(paymentPlataformId);

    if (
      Object.keys(findedPaymentPlataform?.id ?? findedPaymentPlataform).length <
      1
    ) {
      return left(new EntityNotExists('Payment Plataform'));
    }

    const finddedPaymentMethod =
      await this.findPaymentMethodByIdRepository.find(paymentMethodId);

    if (
      Object.keys(finddedPaymentMethod?.id ?? finddedPaymentMethod).length < 1
    ) {
      return left(new EntityNotExists('Payment Method'));
    }

    const findedPlan = await this.findPlanByIdRepository.find(planId);

    if (Object.keys(findedPlan?.id ?? findedPlan).length < 1) {
      return left(new EntityNotExists('Plan'));
    }

    const findedPaymentMethodWithPlataform =
      await this.findPaymentMethodWithPlataformByIdsRepository.find({
        paymentMethodId,
        paymentPlataformId,
      });

    if (Object.keys(findedPaymentMethodWithPlataform).length < 1) {
      return left(
        new EntityNotExists(
          'Relationship between the payment method and the plataform'
        )
      );
    }

    const generatedPayment = await this.generatePaymentRepository.generate({
      payerEmail,
      paymentMethod: finddedPaymentMethod.value,
      planAmount: findedPlan.amount,
      secretKey: findedPaymentPlataform.secretKey,
    });

    if (Object.keys(generatedPayment?.qrCode ?? generatedPayment).length < 1) {
      return left(new EntityNotCreated('Payment'));
    }

    return right(generatedPayment);
  }
}
