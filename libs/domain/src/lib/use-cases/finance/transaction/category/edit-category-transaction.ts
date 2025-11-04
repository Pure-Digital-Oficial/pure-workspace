import { Inject } from '@nestjs/common';
import { EditCategoryTransactionDto } from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  EditCategoryTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindCategoryTransactionByNameRepository,
  FindUserByIdRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class EditCategoryTransaction
  implements
    UseCase<
      EditCategoryTransactionDto,
      Either<EntityNotEmpty | EntityNotExists, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCategoryTransactionByNameRepository')
    private findCategoryTransactionByNameRepository: FindCategoryTransactionByNameRepository,
    @Inject('FindCategoryTransactionByIdRepository')
    private findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository,
    @Inject('EditCategoryTransactionRepository')
    private editCategoryTransactionRepository: EditCategoryTransactionRepository
  ) {}
  async execute(
    input: EditCategoryTransactionDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, string>> {
    const { description, id, loggedUserId, name } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('category transaction ID'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('description'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedCategoryByName =
      await this.findCategoryTransactionByNameRepository.find({
        name,
        loggedUserId,
      });

    if (
      Object.keys(findedCategoryByName.id ?? findedCategoryByName).length > 0 &&
      findedCategoryByName.id !== id
    ) {
      return left(new EntityAlreadyExists('category name'));
    }

    const findedCategory =
      await this.findCategoryTransactionByIdRepository.find(id);

    if (Object.keys(findedCategory.id ?? findedCategory).length < 1) {
      return left(new EntityNotExists('category ID'));
    }

    const editedCategoryTransaction =
      await this.editCategoryTransactionRepository.edit(input);

    if (Object.keys(editedCategoryTransaction).length < 1) {
      return left(new EntityNotEdited('category transaction'));
    }

    return right(editedCategoryTransaction);
  }
}
