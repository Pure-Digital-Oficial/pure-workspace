import {
  CategoryTransactionResponseDto,
  CreateTransactionDto,
  UserResponseDto,
} from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreateTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindTransactionByNameAndValueRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { TransactionMock } from '@/test/entities';
import {
  CreateTransactionRepositoryMock,
  FindCategoryTransactionByIdRepositoryMock,
  FindTransactionByNameAndValueRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { TransactionType } from '@/types';
import { CreateTransaction } from '@/use-cases';

interface SutTypes {
  sut: CreateTransaction;
  createTransactionDto: CreateTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTransactionByNameAndValueRepository: FindTransactionByNameAndValueRepository;
  findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository;
  createTransactionRepository: CreateTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findTransactionByNameAndValueRepository =
    new FindTransactionByNameAndValueRepositoryMock();
  const findCategoryTransactionByIdRepository =
    new FindCategoryTransactionByIdRepositoryMock();
  const createTransactionRepository = new CreateTransactionRepositoryMock();

  const createTransactionDto: CreateTransactionDto = {
    categoryId: TransactionMock.category.id,
    name: TransactionMock.name,
    type: TransactionMock.type as TransactionType,
    value: TransactionMock.value,
    loggedUserId: TransactionMock.createdBy,
  };

  const sut = new CreateTransaction(
    findUserByIdRepository,
    findTransactionByNameAndValueRepository,
    findCategoryTransactionByIdRepository,
    createTransactionRepository
  );

  return {
    sut,
    createTransactionDto,
    findUserByIdRepository,
    findTransactionByNameAndValueRepository,
    findCategoryTransactionByIdRepository,
    createTransactionRepository,
  };
};

describe('CreateTransaction', () => {
  it('should return transaction ID when pass correct transaction object in createTransactionDto', async () => {
    const { createTransactionDto, sut } = makeSut();

    const result = await sut.execute(createTransactionDto);

    expect(result.value).toStrictEqual(TransactionMock.id);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in createTransactionDto object', async () => {
    const { createTransactionDto, sut } = makeSut();
    createTransactionDto.loggedUserId = '';
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty categoryId in createTransactionDto object', async () => {
    const { createTransactionDto, sut } = makeSut();
    createTransactionDto.categoryId = '';
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in createTransactionDto object', async () => {
    const { createTransactionDto, sut } = makeSut();
    createTransactionDto.name = '';
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty type in createTransactionDto object', async () => {
    const { createTransactionDto, sut } = makeSut();
    createTransactionDto.type = '' as TransactionType;
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty value in createTransactionDto object', async () => {
    const { createTransactionDto, sut } = makeSut();
    createTransactionDto.value = '' as unknown as number;
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createShotDto object', async () => {
    const { createTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exists category transaction in the database', async () => {
    const { createTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryTransactionResponseDto);
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when another tranction with name and value exists in the database', async () => {
    const { createTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findTransactionByNameAndValueRepository'], 'find')
      .mockResolvedValueOnce(TransactionMock);
    const result = await sut.execute(createTransactionDto);

    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
  });

  it('should return EntityNotCreated when not created transaction in the database', async () => {
    const { createTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['createTransactionRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
