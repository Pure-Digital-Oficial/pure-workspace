import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../../bases';
import { DeleteFixedGainDto } from '../../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../errors';
import {
  DeleteFixedGainRepository,
  FindFixedGainByIdRepository,
  FindUserByIdRepository,
} from '../../../repositories';
import { UserVerificationId } from '../../../utils';

export class DeleteFixedGain
  implements
    UseCase<
      DeleteFixedGainDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindFixedGainByIdRepository')
    private findFixedGainByIdRepository: FindFixedGainByIdRepository,
    @Inject('DeleteFixedGainRepository')
    private deleteFixedGainRepository: DeleteFixedGainRepository
  ) {}
  async execute(
    input: DeleteFixedGainDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { id, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('transaction ID'));
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

    const findedFixedGain = await this.findFixedGainByIdRepository.find(id);

    if (Object.keys(findedFixedGain.id ?? findedFixedGain).length < 1) {
      return left(new EntityNotExists('fixed gain ID'));
    }

    const deletedFixedGain = await this.deleteFixedGainRepository.delete(input);

    if (Object.keys(deletedFixedGain).length < 1) {
      return left(new EntityNotDeleted('fixed gain'));
    }

    return right(deletedFixedGain);
  }
}
