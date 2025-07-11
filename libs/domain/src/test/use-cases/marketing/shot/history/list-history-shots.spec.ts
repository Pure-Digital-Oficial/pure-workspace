import { UserResponseDto, ListHistoryShotsDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists, EntityIsInvalid } from '@/errors';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  ListHistoryShotsRepository,
} from '@/repositories';
import {
  UserMock,
  HistoryShotMock,
  ListHistoryShotsMock,
} from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  FindUserInShotRepositoryMock,
  ListHistoryShotsRepositoryMock,
} from '@/test/repositories';
import { ListHistoryShots } from '@/use-cases';

interface SutTypes {
  sut: ListHistoryShots;
  listHistoryShotsDto: ListHistoryShotsDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInShotRepository: FindUserInShotRepository;
  listHistoryShotsRepository: ListHistoryShotsRepository;
}

const makeSut = (): SutTypes => {
  const listHistoryShotsRepository = new ListHistoryShotsRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInShotRepository = new FindUserInShotRepositoryMock();

  const listHistoryShotsDto: ListHistoryShotsDto = {
    loggedUserId: UserMock.id,
    shotId: HistoryShotMock.id,
  };

  const sut = new ListHistoryShots(
    findUserByIdRepository,
    findUserInShotRepository,
    listHistoryShotsRepository
  );

  return {
    sut,
    listHistoryShotsDto,
    findUserByIdRepository,
    findUserInShotRepository,
    listHistoryShotsRepository,
  };
};

describe('ListHistoryShots', () => {
  it('should return list of history shots when pass correct user inputs in listHistoryShotsDto', async () => {
    const { listHistoryShotsDto, sut } = makeSut();

    const result = await sut.execute(listHistoryShotsDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(ListHistoryShotsMock);
  });

  it('should return EntityNotEmpty when a pass incorrect logged User ID in listHistoryShotsDto', async () => {
    const { listHistoryShotsDto, sut } = makeSut();
    listHistoryShotsDto.loggedUserId = '';
    const result = await sut.execute(listHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass incorrect shot ID in listHistoryShotsDto', async () => {
    const { listHistoryShotsDto, sut } = makeSut();
    listHistoryShotsDto.shotId = '';
    const result = await sut.execute(listHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listHistoryShotsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when a pass incorrect User ID our shot ID', async () => {
    const { listHistoryShotsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(listHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });
});
