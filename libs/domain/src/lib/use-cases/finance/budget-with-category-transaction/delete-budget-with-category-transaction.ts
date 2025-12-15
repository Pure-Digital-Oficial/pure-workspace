import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { DeleteBudgetWithCategoryTransactionDto } from '../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  DeleteBudgetWithCategoryTransactionRepository,
  FindBudgetByIdRepository,
  FindBudgetWithCategoryTransactionByIdsRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class DeleteBudgetWithCategoryTransaction
  implements
    UseCase<
      DeleteBudgetWithCategoryTransactionDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCategoryTransactionByIdRepository')
    private findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository,
    @Inject('FindBudgetByIdRepository')
    private findBudgetByIdRepository: FindBudgetByIdRepository,
    @Inject('FindBudgetWithCategoryTransactionByIdsRepository')
    private findBudgetWithCategoryTransactionByIdsRepository: FindBudgetWithCategoryTransactionByIdsRepository,
    @Inject('DeleteBudgetWithCategoryTransactionRepository')
    private deleteBudgetWithCategoryTransactionRepository: DeleteBudgetWithCategoryTransactionRepository
  ) {}
  async execute(
    input: DeleteBudgetWithCategoryTransactionDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { budgetId, categoryTransactionId, loggedUserId } = input;

    if (Object.keys(budgetId).length < 1) {
      return left(new EntityNotEmpty('budget ID'));
    }

    if (Object.keys(categoryTransactionId).length < 1) {
      return left(new EntityNotEmpty('category transaction ID'));
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
      await this.findCategoryTransactionByIdRepository.find(
        categoryTransactionId
      );

    if (Object.keys(findedTransaction.id ?? findedTransaction).length < 1) {
      return left(new EntityNotExists('category transaction ID'));
    }

    const findedBudget = await this.findBudgetByIdRepository.find(budgetId);

    if (Object.keys(findedBudget.id ?? findedBudget).length < 1) {
      return left(new EntityNotExists('budget ID'));
    }

    const findedBudgetWithCategoryTransaction =
      await this.findBudgetWithCategoryTransactionByIdsRepository.find({
        budgetId,
        categoryTransactionId,
      });

    if (Object.keys(findedBudgetWithCategoryTransaction).length < 1) {
      return left(new EntityNotExists('budget with category transaction'));
    }

    const deletedBudgetWithCategoryTransaction =
      await this.deleteBudgetWithCategoryTransactionRepository.delete(input);

    if (Object.keys(deletedBudgetWithCategoryTransaction).length < 1) {
      return left(new EntityNotDeleted('budget with category transaction'));
    }

    return right(deletedBudgetWithCategoryTransaction);
  }
}
