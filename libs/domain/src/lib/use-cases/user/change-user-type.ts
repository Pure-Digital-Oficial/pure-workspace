import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { ChangeUserTypeDto } from '../../dtos';
import { EntityNotEdited, EntityNotEmpty, EntityNotExists } from '../../errors';
import {
  ChangeUserTypeRepository,
  FindUserByIdRepository,
} from '../../repositories';
import { UserVerificationId } from '../../utils';

export class ChangeUserType
  implements
    UseCase<
      ChangeUserTypeDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotEdited, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ChangeUserTypeRepository')
    private changeUserTypeRepository: ChangeUserTypeRepository
  ) {}
  async execute(
    input: ChangeUserTypeDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotEdited, string>
  > {
    const { type, userId } = input;

    if (Object.keys(type).length < 1) {
      return left(new EntityNotEmpty('type'));
    }

    if (Object.keys(userId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    const userVerification = await UserVerificationId(
      userId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const changedUserType = await this.changeUserTypeRepository.change(input);

    if (Object.keys(changedUserType).length < 1) {
      return left(new EntityNotEdited('User'));
    }

    return right(changedUserType);
  }
}
