import {
  BudgetResponseDto,
  CategoryTransactionResponseDto,
  EditBudgetWithCategoryTransactionDto,
  UserResponseDto,
} from '@/dtos';
import {
  EditBudgetWithCategoryTransactionRepository,
  FindBudgetByIdRepository,
  FindBudgetWithCategoryTransactionByIdsRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { EditBudgetWithCategoryTransaction } from '@/use-cases';
import {
  BudgetMock,
  BudgetWithCategoryTransactionMock,
  CategoryTransactionMock,
  UserMock,
} from '@/test/entities';
import {
  EditBudgetWithCategoryTransactionRepositoryMock,
  FindBudgetByIdRepositoryMock,
  FindCategoryTransactionByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { EntityNotEdited, EntityNotEmpty, EntityNotExists } from '@/errors';

export interface SutTypes {
  sut: EditBudgetWithCategoryTransaction;
  editBudgetWithCategoryTransactionDto: EditBudgetWithCategoryTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository;
  findBudgetByIdRepository: FindBudgetByIdRepository;
  findBudgetWithCategoryTransactionByIdsRepository: FindBudgetWithCategoryTransactionByIdsRepository;
  editBudgetWithCategoryTransactionRepository: EditBudgetWithCategoryTransactionRepository;
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
  const editBudgetWithCategoryTransactionRepository =
    new EditBudgetWithCategoryTransactionRepositoryMock();

  const editBudgetWithCategoryTransactionDto: EditBudgetWithCategoryTransactionDto =
    {
      budgetId: BudgetMock.id,
      categoryTransactionId: CategoryTransactionMock.id,
      loggedUserId: UserMock.id,
    };

  const sut = new EditBudgetWithCategoryTransaction(
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    findBudgetByIdRepository,
    findBudgetWithCategoryTransactionByIdsRepository,
    editBudgetWithCategoryTransactionRepository
  );

  return {
    sut,
    editBudgetWithCategoryTransactionDto,
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    findBudgetByIdRepository,
    findBudgetWithCategoryTransactionByIdsRepository,
    editBudgetWithCategoryTransactionRepository,
  };
};

describe('EditBudgetWithCategoryTransaction', () => {
  it('should return budget with category transaction ID when pass correct editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();

    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(BudgetWithCategoryTransactionMock.id);
  });
  it('should return EntityNotEmpty when pass empty loggedUserId in editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    editBudgetWithCategoryTransactionDto.loggedUserId = '';
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty budgetId in editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    editBudgetWithCategoryTransactionDto.budgetId = '';
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty categoryTransactionId in editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    editBudgetWithCategoryTransactionDto.categoryTransactionId = '';
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect category transaction ID in editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryTransactionResponseDto);
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect budget ID in editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetByIdRepository'], 'find')
      .mockResolvedValueOnce({} as BudgetResponseDto);
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect budget ID or Category transaction ID in editBudgetWithCategoryTransactionDto object', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetWithCategoryTransactionByIdsRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not edited the budget with category transaction in the database', async () => {
    const { editBudgetWithCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['editBudgetWithCategoryTransactionRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editBudgetWithCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
