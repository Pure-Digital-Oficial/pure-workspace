import { Inject } from '@nestjs/common';
import {
  BodyCategoryTransactionDto,
  CreateCategoryTransactionDto,
} from '../../../../dtos';
import { Either, left, right, UseCase } from '../../../../bases';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../errors';
import {
  FindUserByIdRepository,
  FindCategoryTransactionByNameRepository,
  CreateCategoryTransactionRepository,
} from '../../../../repositories';
import { UserVerificationId } from '../../../../utils';

export class CreateCategoryTransaction
  implements
    UseCase<
      CreateCategoryTransactionDto,
      Either<
        | EntityNotEmpty
        | EntityNotExists
        | EntityAlreadyExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCategoryTransactionByNameRepository')
    private findCategoryTransactionByNameRepository: FindCategoryTransactionByNameRepository,
    @Inject('CreateCategoryTransactionRepository')
    private createCategoryTransactionRepository: CreateCategoryTransactionRepository
  ) {}
  async execute(
    input: BodyCategoryTransactionDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityAlreadyExists | EntityNotCreated,
      string
    >
  > {
    const { description, loggedUserId, name } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('description'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedCategory =
      await this.findCategoryTransactionByNameRepository.find({
        name,
        loggedUserId,
      });

    if (Object.keys(findedCategory.id ?? findedCategory).length > 0) {
      return left(new EntityAlreadyExists('Category Transaction'));
    }

    const createdCategory =
      await this.createCategoryTransactionRepository.create(input);

    if (Object.keys(createdCategory).length < 1) {
      return left(new EntityNotCreated('transaction'));
    }

    return right(createdCategory);
  }
}
