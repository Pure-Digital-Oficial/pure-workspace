import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  ListCategoryTransactionsDto,
  ListCategoryTransactionsResponseDto,
} from '../../../../dtos';
import { EntityNotEmpty } from '../../../../errors';
import {
  FindUserByIdRepository,
  ListCategoryTransactionsRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class ListCategoryTransactions
  implements
    UseCase<
      ListCategoryTransactionsDto,
      Either<EntityNotEmpty, ListCategoryTransactionsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListCategoryTransactionsRepository')
    private listCategoryTransactionsRepository: ListCategoryTransactionsRepository
  ) {}
  async execute(
    input: ListCategoryTransactionsDto
  ): Promise<Either<EntityNotEmpty, ListCategoryTransactionsResponseDto>> {
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

    const listedCategoryTransactions =
      await this.listCategoryTransactionsRepository.list(input);

    return right(listedCategoryTransactions);
  }
}
