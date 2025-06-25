import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import {
  FindTriggerByIdRepository,
  FindUserByIdRepository,
  ListTargetsRepository,
} from '../../../repositories';
import { ListTargetsDto, ListTargetsResponseDto } from '../../../dtos';
import { EntityNotEmpty, EntityNotExists } from '../../../errors';
import { UserVerificationId } from '../../../utils';

export class ListTargets
  implements
    UseCase<
      ListTargetsDto,
      Either<EntityNotEmpty | EntityNotExists, ListTargetsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindTriggerByIdRepository')
    private findTriggerByIdRepository: FindTriggerByIdRepository,
    @Inject('ListTriggersRepository')
    private listTargetsRepository: ListTargetsRepository
  ) {}

  async execute(
    input: ListTargetsDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, ListTargetsResponseDto>> {
    const { loggedUserId, triggerId } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(triggerId).length < 1) {
      return left(new EntityNotEmpty('trigger ID'));
    }

    const userVerification = await UserVerificationId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const findedTriggerById = await this.findTriggerByIdRepository.find(
      triggerId
    );

    if (Object.keys(findedTriggerById?.id ?? findedTriggerById).length < 1) {
      return left(new EntityNotExists('trigger ID'));
    }

    const listTargetsResult = await this.listTargetsRepository.list(input);

    return right(listTargetsResult);
  }
}
