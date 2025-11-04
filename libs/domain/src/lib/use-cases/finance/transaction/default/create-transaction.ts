import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import { CreateTransactionDto } from '../../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  CreateTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindTransactionByNameAndValueRepository,
  FindUserByIdRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class CreateTransaction
  implements
    UseCase<
      CreateTransactionDto,
      Either<
        | EntityNotEmpty
        | EntityAlreadyExists
        | EntityNotExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindTransactionByNameAndValueRepository')
    private findTransactionByNameAndValueRepository: FindTransactionByNameAndValueRepository,
    @Inject('FindCategoryTransactionByIdRepository')
    private findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository,
    @Inject('CreateTransactionRepository')
    private createTransactionRepository: CreateTransactionRepository
  ) {}
  async execute(
    input: CreateTransactionDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityAlreadyExists | EntityNotExists | EntityNotCreated,
      string
    >
  > {
    const { categoryId, name, type, loggedUserId, value } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(categoryId).length < 1) {
      return left(new EntityNotEmpty('category ID'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(type).length < 1) {
      return left(new EntityNotEmpty('type'));
    }

    if (value < 0.1) {
      return left(new EntityNotEmpty('value'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedTransaction =
      await this.findTransactionByNameAndValueRepository.find({
        value,
        name,
        loggedUserId,
      });

    if (Object.keys(findedTransaction.id ?? findedTransaction).length > 0) {
      return left(new EntityAlreadyExists('Transaction'));
    }

    const findedCategory =
      await this.findCategoryTransactionByIdRepository.find(categoryId);

    if (Object.keys(findedCategory.id ?? findedCategory).length < 1) {
      return left(new EntityNotExists('category ID'));
    }

    const createdTransaction = await this.createTransactionRepository.create(
      input
    );

    if (Object.keys(createdTransaction).length < 1) {
      return left(new EntityNotCreated('transaction'));
    }

    return right(createdTransaction);
  }
}
