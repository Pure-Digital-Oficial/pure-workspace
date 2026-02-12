import { ListTransactionsForGraphsDto, UserResponseDto } from '@/dtos';
import { EntityIsInvalid, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListTransactionsForGraphsRepository,
} from '@/repositories';
import { ListTransactionsForGraphsMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListTransactionsForGraphsRepositoryMock,
} from '@/test/repositories';
import { ListTransactionsForGraphs } from '@/use-cases';

interface SutType {
  sut: ListTransactionsForGraphs;
  listTransactionsForGraphsDto: ListTransactionsForGraphsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listTransactionsForGraphsRepository: ListTransactionsForGraphsRepository;
}

export const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listTransactionsForGraphsRepository =
    new ListTransactionsForGraphsRepositoryMock();

  const listTransactionsForGraphsDto: ListTransactionsForGraphsDto = {
    loggedUserId: UserMock.id,
    initialDate: new Date('2023-01-01'),
    finalDate: new Date('2023-12-31'),
  };

  const sut = new ListTransactionsForGraphs(
    findUserByIdRepository,
    listTransactionsForGraphsRepository
  );

  return {
    sut,
    listTransactionsForGraphsDto,
    findUserByIdRepository,
    listTransactionsForGraphsRepository,
  };
};

describe('ListTransactionsForGraphs', () => {
  it('should return object of transactions for graphs when pass correct listTransactionsForGraphsDto object', async () => {
    const { sut, listTransactionsForGraphsDto } = makeSut();

    const result = await sut.execute(listTransactionsForGraphsDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(ListTransactionsForGraphsMock);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listTransactionsForGraphsDto object', async () => {
    const { listTransactionsForGraphsDto, sut } = makeSut();
    listTransactionsForGraphsDto.loggedUserId = '';
    const result = await sut.execute(listTransactionsForGraphsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect initialDate in listTransactionsForGraphsDto object', async () => {
    const { sut, listTransactionsForGraphsDto } = makeSut();
    listTransactionsForGraphsDto.initialDate = new Date('2023-06-51');
    const result = await sut.execute(listTransactionsForGraphsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect finalDate in listTransactionsForGraphsDto object', async () => {
    const { sut, listTransactionsForGraphsDto } = makeSut();
    listTransactionsForGraphsDto.finalDate = new Date('2023-06-51');
    const result = await sut.execute(listTransactionsForGraphsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect finalDate in listTransactionsForGraphsDto object', async () => {
    const { sut, listTransactionsForGraphsDto } = makeSut();
    listTransactionsForGraphsDto.finalDate = new Date('2023-06-51');
    const result = await sut.execute(listTransactionsForGraphsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityIsInvalid when pass finalDate greater than initialDate in listTransactionsForGraphsDto object', async () => {
    const { sut, listTransactionsForGraphsDto } = makeSut();
    listTransactionsForGraphsDto.finalDate = new Date('2023-06-31');
    listTransactionsForGraphsDto.initialDate = new Date('2023-07-31');
    const result = await sut.execute(listTransactionsForGraphsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listTransactionsForGraphsDto object', async () => {
    const { listTransactionsForGraphsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listTransactionsForGraphsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
