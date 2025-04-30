import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { DeleteUserByIdDto } from '../../dtos';
import {
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
} from '../../errors';
import {
  FindUserByIdRepository,
  DeleteUserByIdRepository,
} from '../../repositories';
import { UserVerificationId } from '../../utils';

export class DeleteUserById
  implements
    UseCase<
      DeleteUserByIdDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('DeleteUserByIdRepository')
    private deleteUserByIdRepository: DeleteUserByIdRepository
  ) {}
  async execute(
    input: DeleteUserByIdDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotDeleted, string>
  > {
    const { id, description, loggedUserId } = input;
    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('descrição'));
    }

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('ID'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('Logged User ID'));
    }

    const userVerification = await UserVerificationId(
      id,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const deletedUser = await this.deleteUserByIdRepository.delete(input);

    if (Object.keys(deletedUser).length < 1) {
      return left(new EntityNotDeleted('User'));
    }

    return right(deletedUser);
  }
}
