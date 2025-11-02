import { CreateCategoryTransactionDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreateCategoryTransactionRepository,
  FindCategoryTransactionByNameRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { CategoryTransactionMock, UserMock } from '@/test/entities';
import {
  CreateCategoryTransactionRepositoryMock,
  FindCategoryTransactionByNameRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateCategoryTransaction } from '@/use-cases';

interface SutTypes {
  sut: CreateCategoryTransaction;
  createCategoryTransactionDto: CreateCategoryTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryTransactionByNameRepository: FindCategoryTransactionByNameRepository;
  createCategoryTransactionRepository: CreateCategoryTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryTransactionByNameRepository =
    new FindCategoryTransactionByNameRepositoryMock();
  const createCategoryTransactionRepository =
    new CreateCategoryTransactionRepositoryMock();

  const createCategoryTransactionDto: CreateCategoryTransactionDto = {
    description: CategoryTransactionMock.description,
    loggedUserId: UserMock.id,
    name: CategoryTransactionMock.name,
  };

  const sut = new CreateCategoryTransaction(
    findUserByIdRepository,
    findCategoryTransactionByNameRepository,
    createCategoryTransactionRepository
  );

  return {
    sut,
    createCategoryTransactionDto,
    findUserByIdRepository,
    findCategoryTransactionByNameRepository,
    createCategoryTransactionRepository,
  };
};

describe('CreateCategoryTransaction', () => {
  it('should return category transaction ID when pass correct createCategoryTransactionDto object', async () => {
    const { createCategoryTransactionDto, sut } = makeSut();

    const result = await sut.execute(createCategoryTransactionDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(CategoryTransactionMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in createCategoryTransactionDto object', async () => {
    const { createCategoryTransactionDto, sut } = makeSut();
    createCategoryTransactionDto.loggedUserId = '';
    const result = await sut.execute(createCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in createCategoryTransactionDto object', async () => {
    const { createCategoryTransactionDto, sut } = makeSut();
    createCategoryTransactionDto.name = '';
    const result = await sut.execute(createCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in createCategoryTransactionDto object', async () => {
    const { createCategoryTransactionDto, sut } = makeSut();
    createCategoryTransactionDto.description = '';
    const result = await sut.execute(createCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createCategoryTransactionDto object', async () => {
    const { createCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when exists other category transaction with the same name in the database', async () => {
    const { createCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByNameRepository'], 'find')
      .mockResolvedValueOnce(CategoryTransactionMock);
    const result = await sut.execute(createCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not created transaction in the database', async () => {
    const { createCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['createCategoryTransactionRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
