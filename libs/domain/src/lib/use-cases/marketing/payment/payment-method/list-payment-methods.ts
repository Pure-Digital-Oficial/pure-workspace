import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  ListPaymentMethodsDto,
  ListPaymentMethodsResponseDto,
} from '../../../../dtos';
import { EntityNotEmpty } from '../../../../errors';
import {
  FindUserByIdRepository,
  ListPaymentMethodsRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class ListPaymentMethods
  implements
    UseCase<
      ListPaymentMethodsDto,
      Either<EntityNotEmpty, ListPaymentMethodsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListPaymentMethodsRepository')
    private listPaymentMethodsRepository: ListPaymentMethodsRepository
  ) {}
  async execute(
    input: ListPaymentMethodsDto
  ): Promise<Either<EntityNotEmpty, ListPaymentMethodsResponseDto>> {
    const { loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const listedPaymentMethods = await this.listPaymentMethodsRepository.list(
      input
    );

    return right(listedPaymentMethods);
  }
}
