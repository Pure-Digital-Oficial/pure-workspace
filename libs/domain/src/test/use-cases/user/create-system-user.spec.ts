import { AppResponseDto, CreateSystemUserDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotExists,
  InsufficientCharacters,
} from '@/errors';
import {
  CreateSystemUserRepository,
  FindAppByIdRepository,
  FindUserByIdRepository,
  FindUserByNicknameRepository,
} from '@/repositories';
import { AppMock, UserMock } from '@/test/entities';
import {
  CreateSystemUserRepositoryMock,
  FindAppByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  FindUserByNickNameRepositoryMock,
} from '@/test/repositories';
import { CreateSystemUser } from '@/use-cases';

interface SutTypes {
  sut: CreateSystemUser;
  createSystemUserDto: CreateSystemUserDto;
  findAppByIdRepository: FindAppByIdRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findUserByNicknameRepository: FindUserByNicknameRepository;
  createSystemUserRepository: CreateSystemUserRepository;
}

const makeSut = (): SutTypes => {
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserByNicknameRepository = new FindUserByNickNameRepositoryMock();
  const createSystemUserRepository = new CreateSystemUserRepositoryMock();

  const createSystemUserDto: CreateSystemUserDto = {
    appId: AppMock.id,
    body: {
      name: UserMock.name,
      nickname: UserMock.nickname,
    },
  };

  const sut = new CreateSystemUser(
    findAppByIdRepository,
    findUserByNicknameRepository,
    createSystemUserRepository
  );

  return {
    sut,
    createSystemUserDto,
    findAppByIdRepository,
    findUserByIdRepository,
    findUserByNicknameRepository,
    createSystemUserRepository,
  };
};

describe('CreateSystemUser', () => {
  it('should return User ID when pass correct CreateSystemUserDto object', async () => {
    const { createSystemUserDto, sut } = makeSut();

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(UserMock.id);
  });

  it('should return InsufficientCharacters when pass invalid name', async () => {
    const { createSystemUserDto, sut } = makeSut();
    createSystemUserDto.body.name = '';

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when pass invalid nickname', async () => {
    const { createSystemUserDto, sut } = makeSut();
    createSystemUserDto.body.nickname = '';

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when pass invalid appId', async () => {
    const { createSystemUserDto, sut } = makeSut();
    createSystemUserDto.appId = '';

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityNotExists when pass invalid appId', async () => {
    const { createSystemUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as AppResponseDto);

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass already exists nickname', async () => {
    const { createSystemUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByNicknameRepository'], 'find')
      .mockResolvedValueOnce(UserMock);

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when occur an error in createSystemUserRepository', async () => {
    const { createSystemUserDto, sut } = makeSut();
    jest
      .spyOn(sut['createSystemUserRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createSystemUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
