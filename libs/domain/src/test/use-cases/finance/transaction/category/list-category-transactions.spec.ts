import { ListCategoryTransactionsDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListCategoryTransactionsRepository,
} from '@/repositories';
import { ListCategoryTransactionsMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListCategoryTransactionsRepositoryMock,
} from '@/test/repositories';
import { ListCategoryTransactions } from '@/use-cases';

interface SutType {
  sut: ListCategoryTransactions;
  listCategoryTransactionsDto: ListCategoryTransactionsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listCategoryTransactionsRepository: ListCategoryTransactionsRepository;
}

const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listCategoryTransactionsRepository =
    new ListCategoryTransactionsRepositoryMock();

  const listCategoryTransactionsDto: ListCategoryTransactionsDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListCategoryTransactions(
    findUserByIdRepository,
    listCategoryTransactionsRepository
  );

  return {
    sut,
    listCategoryTransactionsDto,
    findUserByIdRepository,
    listCategoryTransactionsRepository,
  };
};

describe('ListCategoryTransactions', () => {
  it('should return category transactions list when pass correct listCategoryTransactionsDto object', async () => {
    const { listCategoryTransactionsDto, sut } = makeSut();

    const result = await sut.execute(listCategoryTransactionsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListCategoryTransactionsMock);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listCategoryTransactionsDto object', async () => {
    const { listCategoryTransactionsDto, sut } = makeSut();
    listCategoryTransactionsDto.loggedUserId = '';
    const result = await sut.execute(listCategoryTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listCategoryTransactionsDto object', async () => {
    const { listCategoryTransactionsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listCategoryTransactionsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
