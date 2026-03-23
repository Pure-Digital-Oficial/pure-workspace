import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { ListPlansDto, ListPlansResponseDto } from '../../../dtos';
import { EntityNotEmpty } from '../../../errors';
import {
  FindUserByIdRepository,
  ListPlansRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class ListPlans
  implements
    UseCase<ListPlansDto, Either<EntityNotEmpty, ListPlansResponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListPlansRepository')
    private listPlansRepository: ListPlansRepository
  ) {}
  async execute(
    input: ListPlansDto
  ): Promise<Either<EntityNotEmpty, ListPlansResponseDto>> {
    const { loggedUserId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const listPlans = await this.listPlansRepository.list(input);

    return right(listPlans);
  }
}
