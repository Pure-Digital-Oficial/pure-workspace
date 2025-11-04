import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../../bases';
import { EditTransactionDto } from '../../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  EditTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindTransactionByIdRepository,
  FindTransactionByNameAndValueRepository,
  FindUserByIdRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class EditTransaction
  implements
    UseCase<
      EditTransactionDto,
      Either<
        | EntityNotEmpty
        | EntityNotExists
        | EntityAlreadyExists
        | EntityNotEdited,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindTransactionByIdRepository')
    private findTransactionByIdRepository: FindTransactionByIdRepository,
    @Inject('FindTransactionByNameAndValueRepository')
    private findTransactionByNameAndValueRepository: FindTransactionByNameAndValueRepository,
    @Inject('FindCategoryTransactionByIdRepository')
    private findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository,
    @Inject('EditTransactionRepository')
    private editTransactionRepository: EditTransactionRepository
  ) {}

  async execute(
    input: EditTransactionDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityAlreadyExists | EntityNotEdited,
      string
    >
  > {
    const { categoryId, id, loggedUserId, name, type, value } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('transaction ID'));
    }

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

    if (value < 1) {
      return left(new EntityNotEmpty('value'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedTransactionByName =
      await this.findTransactionByNameAndValueRepository.find({
        name,
        value,
        loggedUserId,
      });

    if (
      Object.keys(findedTransactionByName.id ?? findedTransactionByName)
        .length > 0 &&
      findedTransactionByName.id !== id
    ) {
      return left(new EntityAlreadyExists('transaction name'));
    }

    const findedCategory =
      await this.findCategoryTransactionByIdRepository.find(categoryId);

    if (Object.keys(findedCategory.id ?? findedCategory).length < 1) {
      return left(new EntityNotExists('category ID'));
    }

    const findedTransaction = await this.findTransactionByIdRepository.find(id);

    if (Object.keys(findedTransaction.id ?? findedTransaction).length < 1) {
      return left(new EntityNotExists('transaction ID'));
    }

    const editedTransaction = await this.editTransactionRepository.edit(input);

    if (Object.keys(editedTransaction).length < 1) {
      return left(new EntityNotEdited('transaction'));
    }

    return right(editedTransaction);
  }
}
