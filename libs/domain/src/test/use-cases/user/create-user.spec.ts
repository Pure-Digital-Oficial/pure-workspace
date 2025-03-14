import { AppResponseDto, CreateUserDto } from '@/dtos';
import {
  CreateUserRepository,
  FindAppByIdRepository,
  FindUserByNicknameRepository,
} from '@/repositories';
import {
  CreateUserRepositoryMock,
  FindAppByIdRepositoryMock,
  FindUserByNickNameRepositoryMock,
} from '@/test/repositories';
import { CreateUser } from '@/use-cases';
import { AppMock, UserMock } from '@/test/entities';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '@/errors';

interface SutTypes {
  sut: CreateUser;
  createUserDto: CreateUserDto;
  findAppByIdRepository: FindAppByIdRepository;
  findUserByNicknameRepository: FindUserByNicknameRepository;
  createUserRepository: CreateUserRepository;
}

const makeSut = (): SutTypes => {
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const findUserByNicknameRepository = new FindUserByNickNameRepositoryMock();
  const createUserRepository = new CreateUserRepositoryMock();

  const createUserDto: CreateUserDto = {
    appId: AppMock.id,
    body: {
      name: UserMock.name,
      nickname: UserMock.nickname,
    },
  };

  const sut = new CreateUser(
    findAppByIdRepository,
    findUserByNicknameRepository,
    createUserRepository
  );

  return {
    sut,
    createUserDto,
    findAppByIdRepository,
    findUserByNicknameRepository,
    createUserRepository,
  };
};

describe('CreateUser', () => {
  it('should return User ID when pass correct CreateUserDto object', async () => {
    const { createUserDto, sut } = makeSut();

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(UserMock.id);
  });
  it('should return EntityNotEmpty when pass empty app ID in CreateUserDto object', async () => {
    const { createUserDto, sut } = makeSut();
    createUserDto.appId = '';
    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });
  it('should return InsufficientCharacters when pass empty name in CreateUserDto object', async () => {
    const { createUserDto, sut } = makeSut();
    createUserDto.body.name = '';
    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return InsufficientCharacters when pass empty nickname in CreateUserDto object', async () => {
    const { createUserDto, sut } = makeSut();
    createUserDto.body.nickname = '';
    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return EntityAlreadyExists when return user object from findUserByNicknameRepository', async () => {
    const { createUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByNicknameRepository'], 'find')
      .mockResolvedValueOnce(UserMock);

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });
  it('should return EntityNotExists when return empty app object from findAppByIdRepository', async () => {
    const { createUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as AppResponseDto);

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
  it('should return EntityNotCreated when return empty user ID from createUserRepository', async () => {
    const { createUserDto, sut } = makeSut();
    jest.spyOn(sut['createUserRepository'], 'create').mockResolvedValueOnce('');

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
