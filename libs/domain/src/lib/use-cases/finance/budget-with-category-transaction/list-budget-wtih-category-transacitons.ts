import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import {
  ListBudgetWithCategoryTransactionsDto,
  ListBudgetWithCategoryTransactionsResponseDto,
} from '../../../dtos';
import { EntityNotEmpty } from '../../../errors';
import {
  FindUserByIdRepository,
  ListBudgetWithCategoryTransactionsRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class ListBudgetWithCategoryTransactions
  implements
    UseCase<
      ListBudgetWithCategoryTransactionsDto,
      Either<EntityNotEmpty, ListBudgetWithCategoryTransactionsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListBudgetWithCategoryTransactionsRepository')
    private listBudgetWithCategoryTransactionsRepository: ListBudgetWithCategoryTransactionsRepository
  ) {}
  async execute(
    input: ListBudgetWithCategoryTransactionsDto
  ): Promise<
    Either<EntityNotEmpty, ListBudgetWithCategoryTransactionsResponseDto>
  > {
    const { loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const listBudgetWithCategoryTransactions =
      await this.listBudgetWithCategoryTransactionsRepository.list(input);

    return right(listBudgetWithCategoryTransactions);
  }
}
