import {
  BudgetResponseDto,
  CategoryTransactionResponseDto,
  DeleteBudgetWithCategoryTransactionDto,
  UserResponseDto,
} from '@/dtos';
import {
  DeleteBudgetWithCategoryTransactionRepository,
  FindBudgetByIdRepository,
  FindBudgetWithCategoryTransactionByIdsRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { DeleteBudgetWithCategoryTransaction } from '@/use-cases';
import {
  BudgetMock,
  BudgetWithCategoryTransactionMock,
  CategoryTransactionMock,
  UserMock,
} from '@/test/entities';
import {
  DeleteBudgetWithCategoryTransactionRepositoryMock,
  FindBudgetByIdRepositoryMock,
  FindCategoryTransactionByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { EntityNotDeleted, EntityNotEmpty, EntityNotExists } from '@/errors';

export interface SutTypes {
  sut: DeleteBudgetWithCategoryTransaction;
  deleteBudgetWithCategoryTransactionDto: DeleteBudgetWithCategoryTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository;
  findBudgetByIdRepository: FindBudgetByIdRepository;
  findBudgetWithCategoryTransactionByIdsRepository: FindBudgetWithCategoryTransactionByIdsRepository;
  deleteBudgetWithCategoryTransactionRepository: DeleteBudgetWithCategoryTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryTransactionByIdRepository =
    new FindCategoryTransactionByIdRepositoryMock();
  const findBudgetByIdRepository = new FindBudgetByIdRepositoryMock();
  const findBudgetWithCategoryTransactionByIdsRepository: FindBudgetWithCategoryTransactionByIdsRepository =
    {
      find: jest.fn(async () => BudgetWithCategoryTransactionMock.id),
    };
  const deleteBudgetWithCategoryTransactionRepository =
    new DeleteBudgetWithCategoryTransactionRepositoryMock();

  const deleteBudgetWithCategoryTransactionDto: DeleteBudgetWithCategoryTransactionDto =
    {
      budgetId: BudgetMock.id,
      categoryTransactionId: CategoryTransactionMock.id,
      loggedUserId: UserMock.id,
    };

  const sut = new DeleteBudgetWithCategoryTransaction(
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    findBudgetByIdRepository,
    findBudgetWithCategoryTransactionByIdsRepository,
    deleteBudgetWithCategoryTransactionRepository
  );

  return {
    sut,
    deleteBudgetWithCategoryTransactionDto,
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    findBudgetByIdRepository,
    findBudgetWithCategoryTransactionByIdsRepository,
    deleteBudgetWithCategoryTransactionRepository,
  };
};

describe('DeleteBudgetWithCategoryTransaction', () => {
  it('should return budget with category transaction ID when pass correct deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();

    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(BudgetWithCategoryTransactionMock.id);
  });
  it('should return EntityNotEmpty when pass empty loggedUserId in deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    deleteBudgetWithCategoryTransactionDto.loggedUserId = '';
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty budgetId in deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    deleteBudgetWithCategoryTransactionDto.budgetId = '';
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty categoryTransactionId in deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    deleteBudgetWithCategoryTransactionDto.categoryTransactionId = '';
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect category transaction ID in deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryTransactionResponseDto);
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect budget ID in deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetByIdRepository'], 'find')
      .mockResolvedValueOnce({} as BudgetResponseDto);
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect budget ID or Category transaction ID in deleteBudgetWithCategoryTransactionDto object', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetWithCategoryTransactionByIdsRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotDeleted when not deleted the budget with category transaction in the database', async () => {
    const { deleteBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteBudgetWithCategoryTransactionRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
