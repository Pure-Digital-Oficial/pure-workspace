import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { ListBudgetsDto, ListBudgetsResponseDto } from '../../../dtos';
import { EntityNotEmpty } from '../../../errors';
import {
  FindUserByIdRepository,
  ListBudgetsRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class ListBudgets
  implements
    UseCase<ListBudgetsDto, Either<EntityNotEmpty, ListBudgetsResponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListBudgetsRepository')
    private listBudgetsRepository: ListBudgetsRepository
  ) {}

  async execute(
    input: ListBudgetsDto
  ): Promise<Either<EntityNotEmpty, ListBudgetsResponseDto>> {
    const { loggedUserId } = input;

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

    const listedBudgets = await this.listBudgetsRepository.list(input);

    return right(listedBudgets);
  }
}
