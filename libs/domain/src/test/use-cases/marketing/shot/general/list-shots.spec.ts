import { UserResponseDto, ListShotsDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import { FindUserByIdRepository, ListShotsRepository } from '@/repositories';
import { UserMock, ListShotsMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListShotsRepositoryMock,
} from '@/test/repositories';
import { ListShots } from '@/use-cases';

interface SutTypes {
  sut: ListShots;
  listShotsDto: ListShotsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listShotsRepository: ListShotsRepository;
}

const makeSut = (): SutTypes => {
  const listShotsRepository = new ListShotsRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();

  const listShotsDto: ListShotsDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListShots(findUserByIdRepository, listShotsRepository);

  return {
    sut,
    listShotsDto,
    findUserByIdRepository,
    listShotsRepository,
  };
};

describe('ListShots', () => {
  it('should return a list of shots when pass correct user inputs in listShotsDto', async () => {
    const { listShotsDto, sut } = makeSut();

    const result = await sut.execute(listShotsDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(ListShotsMock);
  });

  it('should return EntityNotEmpty when a pass incorrect logged User ID in listShotsDto', async () => {
    const { listShotsDto, sut } = makeSut();
    listShotsDto.loggedUserId = '';
    const result = await sut.execute(listShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listShotsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
