import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  ListTransactionsDto,
  ListTransactionsResponseDto,
} from '../../../../dtos';
import { EntityNotEmpty } from '../../../../errors';
import {
  FindUserByIdRepository,
  ListTransactionsRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class ListTransactions
  implements
    UseCase<
      ListTransactionsDto,
      Either<EntityNotEmpty, ListTransactionsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListTransactionsRepository')
    private listTransactionsRepository: ListTransactionsRepository
  ) {}
  async execute(
    input: ListTransactionsDto
  ): Promise<Either<EntityNotEmpty, ListTransactionsResponseDto>> {
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

    const listedTransactions = await this.listTransactionsRepository.list(
      input
    );

    return right(listedTransactions);
  }
}
