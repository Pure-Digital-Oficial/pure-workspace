import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { CreateAuthDto } from '../../dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  InsufficientCharacters,
} from '../../errors';
import {
  CreateAuthRepository,
  FindAuthByUserIdRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  HashGeneratorRepository,
} from '../../repositories';
import { UserVerificationId } from '../../utils';

export class CreateAuth
  implements
    UseCase<
      CreateAuthDto,
      Either<
        | EntityNotEmpty
        | InsufficientCharacters
        | EntityAlreadyExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByEmailRepository')
    private findUserByEmailRepository: FindUserByEmailRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindAuthByUserIdRepository')
    private findAuthByUserIdRepository: FindAuthByUserIdRepository,
    @Inject('HashGeneratorRepository')
    private hashGeneratorRepository: HashGeneratorRepository,
    @Inject('CreateAuthRepository')
    private createAuthRepository: CreateAuthRepository
  ) {}
  async execute(
    input: CreateAuthDto
  ): Promise<
    Either<
      | EntityNotEmpty
      | InsufficientCharacters
      | EntityAlreadyExists
      | EntityNotCreated,
      string
    >
  > {
    const { email, password, userId } = input;

    if (Object.keys(email).length < 1 || email.length < 3) {
      return left(new InsufficientCharacters('Email'));
    }

    if (Object.keys(password).length < 1 || password.length < 3) {
      return left(new InsufficientCharacters('Password'));
    }

    const filteredEmail = await this.findUserByEmailRepository.find(email);

    if (Object.keys(filteredEmail?.id ?? filteredEmail).length > 0) {
      return left(new EntityAlreadyExists(email));
    }

    const userVerification = await UserVerificationId(
      userId,
      this.findUserByIdRepository
    );

    if (userVerification.isLeft()) {
      return left(userVerification.value);
    }

    const filteredAuth = await this.findAuthByUserIdRepository.find(userId);

    if (Object.keys(filteredAuth).length > 0) {
      return left(new EntityAlreadyExists('User AUthentication'));
    }

    const hashedPassword = await this.hashGeneratorRepository.hash(password);

    if (Object.keys(hashedPassword).length < 1) {
      return left(new EntityNotCreated('password'));
    }

    const createdAuth = await this.createAuthRepository.create({
      ...input,
      password: hashedPassword,
    });

    if (Object.keys(createdAuth).length < 1) {
      return left(new EntityNotCreated('auth'));
    }

    return right(createdAuth);
  }
}
