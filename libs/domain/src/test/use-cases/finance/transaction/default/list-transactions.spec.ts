import { ListTransactionsDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListTransactionsRepository,
} from '@/repositories';
import { ListTransactionsMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListTransactionsRepositoryMock,
} from '@/test/repositories';
import { ListTransactions } from '@/use-cases';

interface SutType {
  sut: ListTransactions;
  listTransactionsDto: ListTransactionsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listTransactionsRepository: ListTransactionsRepository;
}

const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listTransactionsRepository = new ListTransactionsRepositoryMock();

  const listTransactionsDto: ListTransactionsDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListTransactions(
    findUserByIdRepository,
    listTransactionsRepository
  );

  return {
    sut,
    listTransactionsDto,
    findUserByIdRepository,
    listTransactionsRepository,
  };
};

describe('ListTransactions', () => {
  it('should return transactions list when pass correct list transaction object', async () => {
    const { listTransactionsDto, sut } = makeSut();

    const result = await sut.execute(listTransactionsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListTransactionsMock);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listTransactionsDto object', async () => {
    const { listTransactionsDto, sut } = makeSut();
    listTransactionsDto.loggedUserId = '';
    const result = await sut.execute(listTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listTransactionsDto object', async () => {
    const { listTransactionsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listTransactionsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
