import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { DeleteBudgetDto } from '../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  DeleteBudgetRepository,
  FindBudgetByIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class DeleteBudget
  implements
    UseCase<
      DeleteBudgetDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindBudgetByIdRepository')
    private findBudgetByIdRepository: FindBudgetByIdRepository,
    @Inject('DeleteBudgetRepository')
    private deleteBudgetRepository: DeleteBudgetRepository
  ) {}
  async execute(
    input: DeleteBudgetDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { id, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('budget ID'));
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

    const findedBudget = await this.findBudgetByIdRepository.find(id);

    if (Object.keys(findedBudget.id ?? findedBudget).length < 1) {
      return left(new EntityNotExists('budget ID'));
    }

    const deletedBudget = await this.deleteBudgetRepository.delete(input);

    if (Object.keys(deletedBudget).length < 1) {
      return left(new EntityNotDeleted('budget'));
    }

    return right(deletedBudget);
  }
}
