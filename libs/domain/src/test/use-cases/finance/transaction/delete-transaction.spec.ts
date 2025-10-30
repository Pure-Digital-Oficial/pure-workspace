import {
  DeleteTransactionDto,
  TransactionResponseDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotDeleted, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  DeleteTransactionRepository,
  FindTransactionByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { TransactionMock, UserMock } from '@/test/entities';
import {
  DeleteTransactionRepositoryMock,
  FindTransactionByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { DeleteTransaction } from '@/use-cases';

interface SutTypes {
  sut: DeleteTransaction;
  deleteTransactionDto: DeleteTransactionDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTransactionByIdRepository: FindTransactionByIdRepository;
  deleteTransactionRepository: DeleteTransactionRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findTransactionByIdRepository = new FindTransactionByIdRepositoryMock();
  const deleteTransactionRepository = new DeleteTransactionRepositoryMock();

  const deleteTransactionDto: DeleteTransactionDto = {
    id: TransactionMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteTransaction(
    findUserByIdRepository,
    findTransactionByIdRepository,
    deleteTransactionRepository
  );

  return {
    sut,
    deleteTransactionDto,
    findUserByIdRepository,
    findTransactionByIdRepository,
    deleteTransactionRepository,
  };
};

describe('DeleteTransaction', () => {
  it('should return transaction ID when pass correct deleteTransactionDto object', async () => {
    const { deleteTransactionDto, sut } = makeSut();

    const result = await sut.execute(deleteTransactionDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(TransactionMock.id);
  });

  it('should return EntityNotEmpty when pass empty transaction ID in deleteTransactionDto object', async () => {
    const { deleteTransactionDto, sut } = makeSut();
    deleteTransactionDto.id = '';
    const result = await sut.execute(deleteTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in deleteTransactionDto object', async () => {
    const { deleteTransactionDto, sut } = makeSut();
    deleteTransactionDto.loggedUserId = '';
    const result = await sut.execute(deleteTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createShotDto object', async () => {
    const { deleteTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exists transaction in the database', async () => {
    const { deleteTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['findTransactionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as TransactionResponseDto);
    const result = await sut.execute(deleteTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not deleted transaction in the database', async () => {
    const { deleteTransactionDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteTransactionRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteTransactionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
