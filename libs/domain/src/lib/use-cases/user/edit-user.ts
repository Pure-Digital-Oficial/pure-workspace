import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { EditUserDto } from '../../dtos';
import { EntityNotEdited, EntityNotEmpty } from '../../errors';
import { EditUserRepository, FindUserByIdRepository } from '../../repositories';
import { UserVerificationId } from '../../utils';

export class EditUser
  implements UseCase<EditUserDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('EditUserRepository')
    private editUserRepository: EditUserRepository
  ) {}

  async execute(input: EditUserDto): Promise<Either<EntityNotEmpty, string>> {
    const {
      body: { id, name, status },
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(status).length < 1) {
      return left(new EntityNotEmpty('status'));
    }

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    const userValidation = await UserVerificationId(
      id,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const editedUserId = await this.editUserRepository.edit(input);

    if (Object.keys(editedUserId).length < 1) {
      return left(new EntityNotEdited('user'));
    }

    return right(editedUserId);
  }
}
