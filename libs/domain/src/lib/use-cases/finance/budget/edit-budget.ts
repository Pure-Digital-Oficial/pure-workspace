import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { EditBudgetDto } from '../../../dtos';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  EditBudgetRepository,
  FindBudgetByIdRepository,
  FindBudgetByNameRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class EditBudget
  implements UseCase<EditBudgetDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindBudgetByNameRepository')
    private findBudgetByNameRepository: FindBudgetByNameRepository,
    @Inject('FindBudgetByIdRepository')
    private findBudgetByIdRepository: FindBudgetByIdRepository,
    @Inject('EditBudgetRepository')
    private editBudgetRepository: EditBudgetRepository
  ) {}
  async execute(input: EditBudgetDto): Promise<Either<EntityNotEmpty, string>> {
    const { description, id, limitValue, loggedUserId, name } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('budget ID'));
    }

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

    const findedBudgetByName = await this.findBudgetByNameRepository.find({
      name,
      loggedUserId,
    });

    if (
      Object.keys(findedBudgetByName?.id ?? findedBudgetByName).length > 0 &&
      findedBudgetByName.id !== id
    ) {
      return left(new EntityAlreadyExists('budget name'));
    }

    const findedBudgetById = await this.findBudgetByIdRepository.find(id);

    if (Object.keys(findedBudgetById?.id ?? findedBudgetById).length < 1) {
      return left(new EntityNotExists('budget'));
    }

    const editedBudget = await this.editBudgetRepository.edit(input);

    if (Object.keys(editedBudget).length < 1) {
      return left(new EntityNotEdited('budget'));
    }

    return right(editedBudget);
  }
}
