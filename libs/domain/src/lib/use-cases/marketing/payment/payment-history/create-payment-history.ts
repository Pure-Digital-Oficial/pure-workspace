import { Inject } from '@nestjs/common';
import { CreatePaymentHistoryDto } from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  CreatePaymentHistoryRepository,
  FindCharacterByIdRepository,
  FindCustomerByExternalIdRepository,
  // FindCustomerByIdRepository,
  FindPaymentHistoryByExternalIdRepository,
  FindPlanByIdRepository,
  FindUserByIdRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class CreatePaymentHistory
  implements UseCase<CreatePaymentHistoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCharacterByIdRepository')
    private findCharacterByIdRepository: FindCharacterByIdRepository,
    @Inject('FindCustomerByExternalIdRepository')
    private findCustomerByExternalIdRepository: FindCustomerByExternalIdRepository,
    @Inject('FindPlanByIdRepository')
    private findPlanByIdRepository: FindPlanByIdRepository,
    @Inject('FindPaymentHistoryByExternalIdRepository')
    private findPaymenHistoryByExternalIdRepository: FindPaymentHistoryByExternalIdRepository,
    @Inject('CreatePaymentHistoryRepository')
    private createPaymentHistoryRepository: CreatePaymentHistoryRepository
  ) {}
  async execute(
    input: CreatePaymentHistoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { characterId, externalId, loggedUserId, planId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(characterId).length < 1) {
      return left(new EntityNotEmpty('Character ID'));
    }

    if (externalId < 1) {
      return left(new EntityNotEmpty('External ID'));
    }

    if (Object.keys(planId).length < 1) {
      return left(new EntityNotEmpty('Plan ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedCharacter = await this.findCharacterByIdRepository.find(
      characterId
    );

    if (Object.keys(findedCharacter?.id ?? findedCharacter).length < 1) {
      return left(new EntityNotExists('Character'));
    }

    const findedCustomer = await this.findCustomerByExternalIdRepository.find(
      `${externalId}`
    );

    if (Object.keys(findedCustomer?.id ?? findedCustomer).length < 1) {
      return left(new EntityNotExists('Customer'));
    }

    const findedPlan = await this.findPlanByIdRepository.find(planId);

    if (Object.keys(findedPlan?.id ?? findedPlan).length < 1) {
      return left(new EntityNotExists('Plan'));
    }

    const findedPaymentHistory =
      await this.findPaymenHistoryByExternalIdRepository.find(externalId);

    if (
      Object.keys(findedPaymentHistory?.id ?? findedPaymentHistory).length > 0
    ) {
      return left(new EntityAlreadyExists('Payment History'));
    }

    const createdPaymentHistory =
      await this.createPaymentHistoryRepository.create({
        ...input,
        customerId: findedCustomer.id,
        amount: findedPlan.amount,
      });

    if (Object.keys(createdPaymentHistory).length < 1) {
      return left(new EntityNotCreated('Payment History'));
    }

    return right(createdPaymentHistory);
  }
}
