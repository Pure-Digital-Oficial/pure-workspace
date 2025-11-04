import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import { DeleteCategoryTransactionDto } from '../../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  DeleteCategoryTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class DeleteCategoryTransaction
  implements
    UseCase<
      DeleteCategoryTransactionDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCategoryTransactionByIdRepository')
    private findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository,
    @Inject('DeleteCategoryTransactionRepository')
    private deleteCategoryTransactionRepository: DeleteCategoryTransactionRepository
  ) {}
  async execute(
    input: DeleteCategoryTransactionDto
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

    const findedTransaction =
      await this.findCategoryTransactionByIdRepository.find(id);

    if (Object.keys(findedTransaction.id ?? findedTransaction).length < 1) {
      return left(new EntityNotExists('category transaction ID'));
    }

    const deletedTransaction =
      await this.deleteCategoryTransactionRepository.delete(input);

    if (Object.keys(deletedTransaction).length < 1) {
      return left(new EntityNotDeleted('transaction'));
    }

    return right(deletedTransaction);
  }
}
