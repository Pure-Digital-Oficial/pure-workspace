import { ListBudgetWithCategoryTransactionsDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListBudgetWithCategoryTransactionsRepository,
} from '@/repositories';
import { ListBudgetWithCategoryTransactions } from '@/use-cases';
import {
  ListBudgetWithCategoryTransactionsMock,
  UserMock,
} from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListBudgetWithCategoryTransactionsRepositoryMock,
} from '@/test/repositories';

interface SutType {
  sut: ListBudgetWithCategoryTransactions;
  listBudgetWithCategoryTransactionsDto: ListBudgetWithCategoryTransactionsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listBudgetWithCategoryTransactionsRepository: ListBudgetWithCategoryTransactionsRepository;
}

const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listBudgetWithCategoryTransactionsRepository =
    new ListBudgetWithCategoryTransactionsRepositoryMock();

  const listBudgetWithCategoryTransactionsDto: ListBudgetWithCategoryTransactionsDto =
    {
      loggedUserId: UserMock.id,
    };

  const sut = new ListBudgetWithCategoryTransactions(
    findUserByIdRepository,
    listBudgetWithCategoryTransactionsRepository
  );

  return {
    sut,
    listBudgetWithCategoryTransactionsDto,
    findUserByIdRepository,
    listBudgetWithCategoryTransactionsRepository,
  };
};

describe('ListBudgetWithCategoryTransactions', () => {
  it('should return budget with category transactions list when pass correct listBudgetWithCategoryTransactionsDto object', async () => {
    const { listBudgetWithCategoryTransactionsDto, sut } = makeSut();

    const result = await sut.execute(listBudgetWithCategoryTransactionsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListBudgetWithCategoryTransactionsMock);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listBudgetWithCategoryTransactionsDto object', async () => {
    const { listBudgetWithCategoryTransactionsDto, sut } = makeSut();
    listBudgetWithCategoryTransactionsDto.loggedUserId = '';
    const result = await sut.execute(listBudgetWithCategoryTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listBudgetWithCategoryTransactionsDto object', async () => {
    const { listBudgetWithCategoryTransactionsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listBudgetWithCategoryTransactionsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
