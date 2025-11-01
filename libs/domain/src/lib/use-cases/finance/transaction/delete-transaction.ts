import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { DeleteTransactionDto } from '../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  DeleteTransactionRepository,
  FindTransactionByIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class DeleteTransaction
  implements
    UseCase<
      DeleteTransactionDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindTransactionByIdRepository')
    private findTransactionByIdRepository: FindTransactionByIdRepository,
    @Inject('DeleteTransactionRepository')
    private deleteTransactionRepository: DeleteTransactionRepository
  ) {}
  async execute(
    input: DeleteTransactionDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { id, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('transaction ID'));
    }

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

    const findedTransaction = await this.findTransactionByIdRepository.find(id);

    if (Object.keys(findedTransaction.id ?? findedTransaction).length < 1) {
      return left(new EntityNotExists('transaction ID'));
    }

    const deletedTransaction = await this.deleteTransactionRepository.delete(
      input
    );

    if (Object.keys(deletedTransaction).length < 1) {
      return left(new EntityNotDeleted('transaction'));
    }

    return right(deletedTransaction);
  }
}
