import { Inject } from '@nestjs/common';
import {
  ListTotalTransactionsDto,
  TotalTransactionsResponseDto,
} from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import { EntityIsInvalid, EntityNotEmpty } from '../../../../errors';
import {
  FindUserByIdRepository,
  ListTotalTransactionsRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class ListTotalTransactions
  implements
    UseCase<
      ListTotalTransactionsDto,
      Either<EntityNotEmpty, TotalTransactionsResponseDto[]>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListTotalTransactionsRepository')
    private listTotalTransactionsRepository: ListTotalTransactionsRepository
  ) {}
  private isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  async execute(
    input: ListTotalTransactionsDto
  ): Promise<Either<EntityNotEmpty, TotalTransactionsResponseDto[]>> {
    const { loggedUserId, finalDate, initialDate } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (this.isValidDate(finalDate) === false) {
      return left(new EntityNotEmpty('final date'));
    }

    if (this.isValidDate(initialDate) === false) {
      return left(new EntityNotEmpty('initial date'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    if (initialDate > finalDate) {
      return left(new EntityIsInvalid('initial date or final date'));
    }

    const listedTotals = await this.listTotalTransactionsRepository.list(input);

    return right(listedTotals);
  }
}
