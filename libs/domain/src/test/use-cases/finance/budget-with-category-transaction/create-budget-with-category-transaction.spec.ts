import {
  BudgetResponseDto,
  CategoryTransactionResponseDto,
  CreateBudgetWithCategoryTransactionDto,
  UserResponseDto,
} from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreateBudgetWithCategoryTransactionRepository,
  FindBudgetByIdRepository,
  FindBudgetWithCategoryTransactionByIdsRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  BudgetMock,
  BudgetWithCategoryTransactionMock,
  CategoryTransactionMock,
  UserMock,
} from '@/test/entities';
import {
  CreateBudgetWithCategoryTransactionRepositoryMock,
  FindBudgetByIdRepositoryMock,
  FindBudgetWithCategoryTransactionByIdsRepositoryMock,
  FindCategoryTransactionByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateBudgetWithCategoryTransaction } from '@/use-cases';

export interface SutTypes {
  sut: CreateBudgetWithCategoryTransaction;
  createBudgetWithCategoryTransactionDto: CreateBudgetWithCategoryTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository;
  findBudgetByIdRepository: FindBudgetByIdRepository;
  findBudgetWithCategoryTransactionByIdsRepository: FindBudgetWithCategoryTransactionByIdsRepository;
  createBudgetWithCategoryTransactionRepository: CreateBudgetWithCategoryTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryTransactionByIdRepository =
    new FindCategoryTransactionByIdRepositoryMock();
  const findBudgetByIdRepository = new FindBudgetByIdRepositoryMock();
  const findBudgetWithCategoryTransactionByIdsRepository =
    new FindBudgetWithCategoryTransactionByIdsRepositoryMock();
  const createBudgetWithCategoryTransactionRepository =
    new CreateBudgetWithCategoryTransactionRepositoryMock();

  const createBudgetWithCategoryTransactionDto: CreateBudgetWithCategoryTransactionDto =
    {
      budgetId: BudgetMock.id,
      categoryTransactionId: CategoryTransactionMock.id,
      loggedUserId: UserMock.id,
    };

  const sut = new CreateBudgetWithCategoryTransaction(
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    findBudgetByIdRepository,
    findBudgetWithCategoryTransactionByIdsRepository,
    createBudgetWithCategoryTransactionRepository
  );

  return {
    sut,
    createBudgetWithCategoryTransactionDto,
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    findBudgetByIdRepository,
    findBudgetWithCategoryTransactionByIdsRepository,
    createBudgetWithCategoryTransactionRepository,
  };
};

describe('CreateBudgetWithCategoryTransaction', () => {
  it('should return budget with category transaction ID when pass correct createBudgetWithCategoryTransactionDto object', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();

    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(BudgetWithCategoryTransactionMock.id);
  });
  it('should return EntityNotEmpty when pass empty loggedUserId in createBudgetWithCategoryTransactionDto object', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    createBudgetWithCategoryTransactionDto.loggedUserId = '';
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty budgetId in createBudgetWithCategoryTransactionDto object', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    createBudgetWithCategoryTransactionDto.budgetId = '';
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty categoryTransactionId in createBudgetWithCategoryTransactionDto object', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    createBudgetWithCategoryTransactionDto.categoryTransactionId = '';
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createBudgetWithCategoryTransactionDto object', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect category transaction ID in createBudgetWithCategoryTransactionDto object', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryTransactionResponseDto);
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect budget ID in createBudgetWithCategoryTransactionDto object', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetByIdRepository'], 'find')
      .mockResolvedValueOnce({} as BudgetResponseDto);
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when exist the budget with category transaction in the database', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetWithCategoryTransactionByIdsRepository'], 'find')
      .mockResolvedValueOnce(BudgetWithCategoryTransactionMock.id);
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not created the budget with category transaction in the database', async () => {
    const { createBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['createBudgetWithCategoryTransactionRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
