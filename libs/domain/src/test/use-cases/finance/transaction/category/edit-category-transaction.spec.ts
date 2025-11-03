import {
  CategoryTransactionResponseDto,
  EditCategoryTransactionDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotEdited, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  EditCategoryTransactionRepository,
  FindCategoryTransactionByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { CategoryTransactionMock, UserMock } from '@/test/entities';
import {
  EditCategoryTransactionRepositoryMock,
  FindCategoryTransactionByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { EditCategoryTransaction } from '@/use-cases';

interface SutTypes {
  sut: EditCategoryTransaction;
  editCategoryTransactionDto: EditCategoryTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryTransactionByIdRepository: FindCategoryTransactionByIdRepository;
  editCategoryTransactionRepository: EditCategoryTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryTransactionByIdRepository =
    new FindCategoryTransactionByIdRepositoryMock();
  const editCategoryTransactionRepository =
    new EditCategoryTransactionRepositoryMock();

  const editCategoryTransactionDto: EditCategoryTransactionDto = {
    id: CategoryTransactionMock.id,
    description: CategoryTransactionMock.description,
    name: CategoryTransactionMock.name,
    loggedUserId: UserMock.id,
  };

  const sut = new EditCategoryTransaction(
    findUserByIdRepository,
    findCategoryTransactionByIdRepository,
    editCategoryTransactionRepository
  );

  return {
    sut,
    editCategoryTransactionDto,
    findUserByIdRepository,
    editCategoryTransactionRepository,
    findCategoryTransactionByIdRepository,
  };
};

describe('EditCategoryTransaction', () => {
  it('should return category transaction ID when pass correct editCategoryTransactionDto object', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();

    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(CategoryTransactionMock.id);
  });

  it('should return EntityNotEmpty when pass empty transaction ID in editCategoryTransactionDto object', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();
    editCategoryTransactionDto.id = '';
    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in editCategoryTransactionDto object', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();
    editCategoryTransactionDto.loggedUserId = '';
    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in editCategoryTransactionDto object', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();
    editCategoryTransactionDto.name = '';
    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in editCategoryTransactionDto object', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();
    editCategoryTransactionDto.description = '';
    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createShotDto object', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exists category transaction in the database', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryTransactionResponseDto);
    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not edited category transaction in the database', async () => {
    const { editCategoryTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['editCategoryTransactionRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editCategoryTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
