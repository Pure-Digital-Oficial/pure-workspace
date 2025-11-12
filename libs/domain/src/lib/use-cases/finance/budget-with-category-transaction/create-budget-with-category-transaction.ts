import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import {
  BudgetWithCategoryTransactionBodyDto,
  CreateBudgetWithCategoryTransactionDto,
} from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  CreateBudgetWithCategoryTransactionRepository,
  FindBudgetByIdRepository,
  FindBudgetWithCategoryTransactionByIdsRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class CreateBudgetWithCategoryTransaction
  implements
    UseCase<
      CreateBudgetWithCategoryTransactionDto,
      Either<EntityNotEmpty, string>
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
    @Inject('CreateBudgetWithCategoryTransactionRepository')
    private createBudgetWithCategoryTransactionRepository: CreateBudgetWithCategoryTransactionRepository
  ) {}
  async execute(
    input: BudgetWithCategoryTransactionBodyDto
  ): Promise<Either<EntityNotEmpty, string>> {
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

    if (Object.keys(findedBudgetWithCategoryTransaction).length > 0) {
      return left(new EntityAlreadyExists('budget with category transaction'));
    }

    const createdBudgetWithCategoryTransaction =
      await this.createBudgetWithCategoryTransactionRepository.create(input);

    if (Object.keys(createdBudgetWithCategoryTransaction).length < 1) {
      return left(new EntityNotEdited('budget with category transaction'));
    }

    return right(createdBudgetWithCategoryTransaction);
  }
}
