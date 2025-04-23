import { AppResponseDto, ListUsersDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import { FindAppByIdRepository, ListUsersRepository } from '@/repositories';
import { AppMock, ListUsersMock } from '@/test/entities';
import {
  FindAppByIdRepositoryMock,
  ListUsersRepositoryMock,
} from '@/test/repositories';
import { ListUsers } from '@/use-cases';

interface SutTypes {
  sut: ListUsers;
  listUserDto: ListUsersDto;
  findAppByIdRepository: FindAppByIdRepository;
  listUserRepository: ListUsersRepository;
}

const makeSut = (): SutTypes => {
  const listUserRepository = new ListUsersRepositoryMock();
  const findAppByIdRepository = new FindAppByIdRepositoryMock();

  const listUserDto: ListUsersDto = {
    appId: AppMock.id,
  };

  const sut = new ListUsers(findAppByIdRepository, listUserRepository);

  return {
    sut,
    listUserDto,
    listUserRepository,
    findAppByIdRepository,
  };
};

describe('ListUser', () => {
  it('should return a list of users when pass correct user inputs in listUserDto', async () => {
    const { listUserDto, sut } = makeSut();

    const result = await sut.execute(listUserDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual(ListUsersMock);
  });

  it('should return EntityNotEmpty when a pass incorrect app ID in listUserDto', async () => {
    const { listUserDto, sut } = makeSut();
    listUserDto.appId = '';
    const result = await sut.execute(listUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as AppResponseDto);
    const result = await sut.execute(listUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
