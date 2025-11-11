import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { BudgetBodyDto, CreateBudgetDto } from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  CreateBudgetRepository,
  FindBudgetByNameRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class CreateBudget
  implements
    UseCase<
      CreateBudgetDto,
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
    @Inject('FindBudgetByNameRepository')
    private findBudgetByNameRepository: FindBudgetByNameRepository,
    @Inject('CreateBudgetRepository')
    private createBudgetRepository: CreateBudgetRepository
  ) {}
  async execute(
    input: BudgetBodyDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityAlreadyExists | EntityNotCreated,
      string
    >
  > {
    const { name, description, limitValue, loggedUserId } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('description'));
    }

    if (limitValue < 0.1) {
      return left(new EntityNotEmpty('limit value'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedBudget = await this.findBudgetByNameRepository.find({
      name,
      loggedUserId,
    });

    if (Object.keys(findedBudget.id ?? findedBudget).length > 0) {
      return left(new EntityAlreadyExists('budget'));
    }

    const createdFixedGain = await this.createBudgetRepository.create(input);

    if (Object.keys(createdFixedGain).length < 1) {
      return left(new EntityNotCreated('budget'));
    }

    return right(createdFixedGain);
  }
}
