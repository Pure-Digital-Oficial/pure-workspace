import {
  CategoryTransactionResponseDto,
  DeleteCategoryTransactionDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotDeleted, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  DeleteCategoryTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { CategoryTransactionMock, UserMock } from '@/test/entities';
import {
  DeleteCategoryTransactionRepositoryMock,
  FindCategoryTransactionByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { DeleteCategoryTransaction } from '@/use-cases';

interface SutTypes {
  sut: DeleteCategoryTransaction;
  deleteCategoryTransactionDto: DeleteCategoryTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository;
  deleteCategoryTransactionRepository: DeleteCategoryTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryTransactionByIdRepository =
    new FindCategoryTransactionByIdRepositoryMock();
  const deleteCategoryTransactionRepository =
    new DeleteCategoryTransactionRepositoryMock();

  const deleteCategoryTransactionDto: DeleteCategoryTransactionDto = {
    id: CategoryTransactionMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteCategoryTransaction(
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    deleteCategoryTransactionRepository
  );

  return {
    sut,
    deleteCategoryTransactionDto,
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    deleteCategoryTransactionRepository,
  };
};

describe('DeleteCategoryTransaction', () => {
  it('should return cateory transaction ID when pass correct deleteCategoryTransactionDto object', async () => {
    const { deleteCategoryTransactionDto, sut } = makeSut();

    const result = await sut.execute(deleteCategoryTransactionDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(CategoryTransactionMock.id);
  });

  it('should return EntityNotEmpty when pass empty transaction ID in deleteCategoryTransactionDto object', async () => {
    const { deleteCategoryTransactionDto, sut } = makeSut();
    deleteCategoryTransactionDto.id = '';
    const result = await sut.execute(deleteCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in deleteCategoryTransactionDto object', async () => {
    const { deleteCategoryTransactionDto, sut } = makeSut();
    deleteCategoryTransactionDto.loggedUserId = '';
    const result = await sut.execute(deleteCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createShotDto object', async () => {
    const { deleteCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exists category transaction in the database', async () => {
    const { deleteCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryTransactionResponseDto);
    const result = await sut.execute(deleteCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not deleted category transaction in the database', async () => {
    const { deleteCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteCategoryTransactionRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
