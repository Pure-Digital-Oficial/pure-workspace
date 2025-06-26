import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { EditUserProfileDto } from '../../dtos';
import {
  EntityAlreadyExists,
  EntityIsInvalid,
  EntityNotEdited,
  EntityNotEmpty,
} from '../../errors';
import {
  EditUserProfileRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
} from '../../repositories';
import { UserVerificationId } from '../../utils';

export class EditUserProfile
  implements UseCase<EditUserProfileDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindUserByEmailRepository')
    private findUserByEmailRepository: FindUserByEmailRepository,
    @Inject('EditUserProfileRepository')
    private editUserProfileRepository: EditUserProfileRepository
  ) {}
  async execute(
    input: EditUserProfileDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { email, id, name, loggedUserId } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('email'));
    }

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('user ID'));
    }

    const userValidation = await UserVerificationId(
      id,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    if (loggedUserId !== id) {
      return left(new EntityIsInvalid('user'));
    }

    const filteredUserEmail = await this.findUserByEmailRepository.find(email);

    if (
      Object.keys(filteredUserEmail?.id ?? filteredUserEmail).length > 0 &&
      filteredUserEmail?.id !== id
    ) {
      return left(new EntityAlreadyExists(email));
    }

    const editedUserProfile = await this.editUserProfileRepository.edit(input);

    if (Object.keys(editedUserProfile).length < 1) {
      return left(new EntityNotEdited('user'));
    }

    return right(editedUserProfile);
  }
}
