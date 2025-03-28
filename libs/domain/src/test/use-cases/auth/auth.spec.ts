import { AppResponseDto, AuthDto, UserResponseDto } from '@/dtos';
import {
  EntityIsInvalid,
  EntityNotAccess,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  FindAppByIdRepository,
  FindUserByEmailRepository,
  FindUserInAppRepository,
  ValidatePasswordRepository,
  GenerateTokenRepository,
} from '@/repositories';
import { AppMock, AuthMock, TokenMock, UserMock } from '@/test/entities';
import {
  FindAppByIdRepositoryMock,
  FindUserInAppRepositoryMock,
  GenerateTokenRepositoryMock,
  ValidatePasswordRepositoryMock,
} from '@/test/repositories';
import { Auth } from '@/use-cases';

interface SutTypes {
  sut: Auth;
  authDto: AuthDto;
  findUserByEmailRepository: FindUserByEmailRepository;
  findAppByIdRepository: FindAppByIdRepository;
  findUserInAppRepository: FindUserInAppRepository;
  validatePasswordRepository: ValidatePasswordRepository;
  generateTokenRepository: GenerateTokenRepository;
}

const makeSut = (): SutTypes => {
  const mockEmailRepository: FindUserByEmailRepository = {
    find: jest.fn(async () => UserMock),
  };
  const findUserByEmailRepository = mockEmailRepository;
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const findUserInAppRepository = new FindUserInAppRepositoryMock();
  const validatePasswordRepository = new ValidatePasswordRepositoryMock();
  const generateTokenRepository = new GenerateTokenRepositoryMock();

  const authDto: AuthDto = {
    appId: AppMock.id,
    email: AuthMock.email,
    password: AuthMock.password ?? '',
  };

  const sut = new Auth(
    findUserByEmailRepository,
    findAppByIdRepository,
    findUserInAppRepository,
    validatePasswordRepository,
    generateTokenRepository
  );

  return {
    sut,
    authDto,
    findUserByEmailRepository,
    findAppByIdRepository,
    findUserInAppRepository,
    validatePasswordRepository,
    generateTokenRepository,
  };
};

describe('Auth', () => {
  it('Should return Access Token when pass correct authDto object', async () => {
    const { authDto, sut } = makeSut();
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce(TokenMock.accessToken);
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce(TokenMock.refreshToken);

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(TokenMock);
  });

  it('Should return EntityNotEmpty when pass incorrect email in authDto object', async () => {
    const { authDto, sut } = makeSut();
    authDto.email = '';

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('Should return EntityNotEmpty when pass incorrect password in authDto object', async () => {
    const { authDto, sut } = makeSut();
    authDto.password = '';

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('Should return EntityNotEmpty when pass incorrect app ID in authDto object', async () => {
    const { authDto, sut } = makeSut();
    authDto.appId = '';

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityIsInvalid when return empty user object from findUserByEmailRepository', async () => {
    const { authDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByEmailRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotExists when return empty app object from findAppByIdRepository', async () => {
    const { authDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as AppResponseDto);

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotAccess when return empty app ID and user ID from findUserInAppRepository', async () => {
    const { authDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInAppRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotAccess);
  });

  it('should return EntityIsInvalid when return false from validatePasswordRepository', async () => {
    const { authDto, sut } = makeSut();
    jest
      .spyOn(sut['validatePasswordRepository'], 'validate')
      .mockResolvedValueOnce(false);

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotCreated when return empty Access Token from generateTokenRespository', async () => {
    const { authDto, sut } = makeSut();
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce('');

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityNotCreated when return empty Refresh Token from generateTokenRespository', async () => {
    const { authDto, sut } = makeSut();
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce(TokenMock.accessToken);
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce('');

    const result = await sut.execute(authDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
