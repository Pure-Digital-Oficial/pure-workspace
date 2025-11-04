import {
  CategoryTransactionResponseDto,
  EditTransactionDto,
  TransactionResponseDto,
  UserResponseDto,
} from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  EditTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindTransactionByIdRepository,
  FindTransactionByNameAndValueRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { TransactionMock } from '@/test/entities';
import {
  EditTransactionRepositoryMock,
  FindCategoryTransactionByIdRepositoryMock,
  FindTransactionByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { TransactionType } from '@/types';
import { EditTransaction } from '@/use-cases';

interface SutTypes {
  sut: EditTransaction;
  editTransactionDto: EditTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTransactionByIdRepository: FindTransactionByIdRepository;
  findTransactionByNameAndValueRepository: FindTransactionByNameAndValueRepository;
  findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository;
  editTransactionRepository: EditTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findTransactionByIdRepository = new FindTransactionByIdRepositoryMock();
  const findTransactionByNameAndValueRepository: FindTransactionByNameAndValueRepository =
    {
      find: jest.fn(async () => TransactionMock),
    };
  const findCategoryTransactionByIdRepository =
    new FindCategoryTransactionByIdRepositoryMock();
  const editTransactionRepository = new EditTransactionRepositoryMock();

  const editTransactionDto: EditTransactionDto = {
    id: TransactionMock.id,
    categoryId: TransactionMock.category.id,
    name: TransactionMock.name,
    type: TransactionMock.type as TransactionType,
    value: TransactionMock.value,
    loggedUserId: TransactionMock.createdBy,
  };

  const sut = new EditTransaction(
    findUserByIdRepository,
    findTransactionByIdRepository,
    findTransactionByNameAndValueRepository,
    findCategoryTransactionByIdRepository,
    editTransactionRepository
  );

  return {
    sut,
    editTransactionDto,
    findUserByIdRepository,
    findTransactionByIdRepository,
    findTransactionByNameAndValueRepository,
    findCategoryTransactionByIdRepository,
    editTransactionRepository,
  };
};

describe('EditTransaction', () => {
  it('should return transaction ID when pass correct editTransactionDto object', async () => {
    const { editTransactionDto, sut } = makeSut();

    const result = await sut.execute(editTransactionDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(TransactionMock.id);
  });

  it('should return EntityNotEmpty when pass empty transaction ID in editTransactionDto object', async () => {
    const { editTransactionDto, sut } = makeSut();
    editTransactionDto.id = '';
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in editTransactionDto object', async () => {
    const { editTransactionDto, sut } = makeSut();
    editTransactionDto.loggedUserId = '';
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty categoryId in editTransactionDto object', async () => {
    const { editTransactionDto, sut } = makeSut();
    editTransactionDto.categoryId = '';
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in editTransactionDto object', async () => {
    const { editTransactionDto, sut } = makeSut();
    editTransactionDto.name = '';
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty type in editTransactionDto object', async () => {
    const { editTransactionDto, sut } = makeSut();
    editTransactionDto.type = '' as TransactionType;
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty value in editTransactionDto object', async () => {
    const { editTransactionDto, sut } = makeSut();
    editTransactionDto.value = '' as unknown as number;
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createShotDto object', async () => {
    const { editTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exists category transaction in the database', async () => {
    const { editTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryTransactionResponseDto);
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when the category transaction exists other in database with same name and value', async () => {
    const { editTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findTransactionByNameAndValueRepository'], 'find')
      .mockResolvedValueOnce({
        ...TransactionMock,
        id: 'any_id',
      });
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when not exists transaction in the database', async () => {
    const { editTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as TransactionResponseDto);
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not edited transaction in the database', async () => {
    const { editTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['editTransactionRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
