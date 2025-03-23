import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { AccessTokenResponseDto, AuthDto } from '../../dtos';
import {
  EntityIsInvalid,
  EntityNotAccess,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../errors';
import {
  FindAppByIdRepository,
  FindUserByEmailRepository,
  FindUserInAppRepository,
  SignInRepository,
  ValidatePasswordRepository,
} from '../../repositories';

export class Auth
  implements
    UseCase<
      AuthDto,
      Either<
        EntityNotEmpty | EntityIsInvalid | EntityNotExists | EntityNotCreated,
        AccessTokenResponseDto
      >
    >
{
  constructor(
    @Inject('FindUserByEmailRepository')
    private findUserByEmailRepository: FindUserByEmailRepository,
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('FindUserInAppRepository')
    private findUserInAppRepository: FindUserInAppRepository,
    @Inject('ValidatePasswordRepository')
    private validatePasswordRepository: ValidatePasswordRepository,
    @Inject('SignInRepository')
    private signInRepository: SignInRepository
  ) {}

  async execute(
    input: AuthDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityIsInvalid | EntityNotExists | EntityNotCreated,
      AccessTokenResponseDto
    >
  > {
    const { email, password, appId } = input;

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('email'));
    }

    if (Object.keys(password).length < 1) {
      return left(new EntityNotEmpty('password'));
    }

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('app ID'));
    }

    const filteredUser = await this.findUserByEmailRepository.find(email);

    const userId = filteredUser?.id ?? '';

    if (Object.keys(userId).length < 1) {
      return left(new EntityIsInvalid('email or passsword'));
    }

    const filteredApp = await this.findAppByIdRepository.find(appId);

    if (Object.keys(filteredApp?.id || filteredApp).length < 1) {
      return left(new EntityNotExists('app'));
    }

    const filteredUserInApp = await this.findUserInAppRepository.find({
      appId,
      userId,
    });

    if (Object.keys(filteredUserInApp).length < 1) {
      return left(new EntityNotAccess('user'));
    }

    const passwordCompared = await this.validatePasswordRepository.validate({
      passwordEntered: password,
      userPassword: filteredUser?.auth?.password ?? '',
    });

    if (!passwordCompared) {
      return left(new EntityIsInvalid('email or password'));
    }

    const loggedUserToken = await this.signInRepository.sign({
      email,
      userId,
    });

    if (Object.keys(loggedUserToken?.token || loggedUserToken).length < 1) {
      return left(new EntityNotCreated('token'));
    }

    return right(loggedUserToken);
  }
}
