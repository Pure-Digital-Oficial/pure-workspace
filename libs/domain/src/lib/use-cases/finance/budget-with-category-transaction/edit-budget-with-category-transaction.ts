import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { EditBudgetWithCategoryTransactionDto } from '../../../dtos';
import {
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  EditBudgetWithCategoryTransactionRepository,
  FindBudgetByIdRepository,
  FindBudgetWithCategoryTransactionByIdsRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class EditBudgetWithCategoryTransaction
  implements
    UseCase<
      EditBudgetWithCategoryTransactionDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotEdited, string>
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
    @Inject('EditBudgetWithCategoryTransactionRepository')
    private editBudgetWithCategoryTransactionRepository: EditBudgetWithCategoryTransactionRepository
  ) {}
  async execute(
    input: EditBudgetWithCategoryTransactionDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotEdited, string>
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

    if (input.newBudgetId) {
      const findedNewBudget = await this.findBudgetByIdRepository.find(
        input.newBudgetId
      );

      if (Object.keys(findedNewBudget.id ?? findedNewBudget).length < 1) {
        return left(new EntityNotExists('new budget ID'));
      }
    }

    if (input.newCategoryTransactionId) {
      const findedNewCategoryTransaction =
        await this.findCategoryTransactionByIdRepository.find(
          input.newCategoryTransactionId
        );

      if (
        Object.keys(
          findedNewCategoryTransaction.id ?? findedNewCategoryTransaction
        ).length < 1
      ) {
        return left(new EntityNotExists('new category transaction ID'));
      }
    }

    const editedBudgetWithCategoryTransaction =
      await this.editBudgetWithCategoryTransactionRepository.edit(input);

    if (Object.keys(editedBudgetWithCategoryTransaction).length < 1) {
      return left(new EntityNotEdited('budget with category transaction'));
    }

    return right(editedBudgetWithCategoryTransaction);
  }
}
