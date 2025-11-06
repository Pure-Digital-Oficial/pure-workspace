import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { ListFixedGainsDto, ListFixedGainsResponseDto } from '../../../dtos';
import { EntityNotEmpty } from '../../../errors';
import {
  FindUserByIdRepository,
  ListFixedGainsRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class ListFixedGains
  implements
    UseCase<
      ListFixedGainsDto,
      Either<EntityNotEmpty, ListFixedGainsResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListFixedGainsRepository')
    private listFixedGainsRepository: ListFixedGainsRepository
  ) {}
  async execute(
    input: ListFixedGainsDto
  ): Promise<Either<EntityNotEmpty, ListFixedGainsResponseDto>> {
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

    const listedFixedGains = await this.listFixedGainsRepository.list(input);

    return right(listedFixedGains);
  }
}
