import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { AccessTokenResponseDto, AuthDto } from '../../dtos';
import {
  EntityIsInvalid,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../errors';
import {
  FindUserByEmailRepository,
  SignIdRepository,
  ValidatePasswordRepository,
} from '../../repositories';

export class AUth
  implements
    UseCase<
      AuthDto,
      Either<
        EntityNotEmpty | EntityIsInvalid | EntityNotCreated,
        AccessTokenResponseDto
      >
    >
{
  constructor(
    @Inject('FindUserByEmailRepository')
    private findUserByEmailRepository: FindUserByEmailRepository,
    @Inject('ValidatePasswordRepository')
    private validatePasswordRepository: ValidatePasswordRepository,
    @Inject('SignIdRepository')
    private signInRepository: SignIdRepository
  ) {}

  async execute(
    input: AuthDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityIsInvalid | EntityNotCreated,
      AccessTokenResponseDto
    >
  > {
    const { email, password } = input;

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('email'));
    }

    if (Object.keys(password).length < 1) {
      return left(new EntityNotEmpty('password'));
    }

    const filteredUser = await this.findUserByEmailRepository.find(email);

    if (Object.keys(filteredUser?.id || filteredUser).length < 1) {
      return left(new EntityIsInvalid('user or passsword'));
    }

    const passwordCompared = await this.validatePasswordRepository.validate({
      passwordEntered: password,
      userPassword: filteredUser?.auth?.password ?? '',
    });

    if (!passwordCompared) {
      return left(new EntityIsInvalid('user or password'));
    }

    const loggedUserToken = await this.signInRepository.sign({
      email,
      userId: filteredUser?.id ?? '',
    });

    if (Object.keys(loggedUserToken?.token).length < 1) {
      return left(new EntityNotCreated('token'));
    }

    return right(loggedUserToken);
  }
}
