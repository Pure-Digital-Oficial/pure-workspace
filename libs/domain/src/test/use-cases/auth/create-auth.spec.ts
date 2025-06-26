import { CreateAuthDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '@/errors';
import {
  CreateAuthRepository,
  FindAuthByUserIdRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  HashGeneratorRepository,
} from '@/repositories';
import { AuthMock, UserMock } from '@/test/entities';
import {
  CreateAuthRepositoryMock,
  FindAuthByUserIdRepositoryMock,
  FindUserByEmailRepositoryMock,
  FindUserByIdRepositoryMock,
  HashGeneratorRepositoryMock,
} from '@/test/repositories';
import { CreateAuth } from '@/use-cases';

interface SutTypes {
  sut: CreateAuth;
  createAuthDto: CreateAuthDto;
  findUserByEmailRepository: FindUserByEmailRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findAuthByUserIdRepository: FindAuthByUserIdRepository;
  hashGeneratorRepository: HashGeneratorRepository;
  createAuthRepository: CreateAuthRepository;
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepository = new FindUserByEmailRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findAuthByUserIdRepository = new FindAuthByUserIdRepositoryMock();
  const hashGeneratorRepository = new HashGeneratorRepositoryMock();
  const createAuthRepository = new CreateAuthRepositoryMock();

  const createAuthDto: CreateAuthDto = {
    email: AuthMock.email,
    password: AuthMock.password ?? '',
    userId: AuthMock.userId,
  };

  const sut = new CreateAuth(
    findUserByEmailRepository,
    findUserByIdRepository,
    findAuthByUserIdRepository,
    hashGeneratorRepository,
    createAuthRepository
  );

  return {
    findUserByEmailRepository,
    findUserByIdRepository,
    findAuthByUserIdRepository,
    hashGeneratorRepository,
    createAuthRepository,
    createAuthDto,
    sut,
  };
};

describe('CreateAuth', () => {
  it('Should return Auth ID when pass correct data object in CreateAuth Use Case', async () => {
    const { createAuthDto, sut } = makeSut();

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(AuthMock.id);
  });

  it('Should return InsufficientCharacters when pass incorrect email data in CreateAuth Use Case', async () => {
    const { createAuthDto, sut } = makeSut();
    createAuthDto.email = '';

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('Should return InsufficientCharacters when pass incorrect password data in CreateAuth Use Case', async () => {
    const { createAuthDto, sut } = makeSut();
    createAuthDto.password = '';

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('Should return EntityNotEmpty when pass empty user ID data in CreateAuth Use Case', async () => {
    const { createAuthDto, sut } = makeSut();
    createAuthDto.userId = '';

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when return user object from findUserByEmailRepository', async () => {
    const { createAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByEmailRepository'], 'find')
      .mockResolvedValueOnce(UserMock);

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when return user object from findUserByIdRepository', async () => {
    const { createAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when return auth ID from findAuthByUserIdRepository', async () => {
    const { createAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['findAuthByUserIdRepository'], 'find')
      .mockResolvedValueOnce(UserMock.id);

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when return user object from hashGeneratorRepository', async () => {
    const { createAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['hashGeneratorRepository'], 'hash')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityNotCreated when return user object from createAuthRepository', async () => {
    const { createAuthDto, sut } = makeSut();
    jest.spyOn(sut['createAuthRepository'], 'create').mockResolvedValueOnce('');

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
