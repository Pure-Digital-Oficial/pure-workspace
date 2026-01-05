import { ListTotalTransactionsDto, UserResponseDto } from '@/dtos';
import { EntityIsInvalid, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListTotalTransactionsRepository,
} from '@/repositories';
import { TotalTransactionsMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListTotalTransactionsRepositoryMock,
} from '@/test/repositories';
import { ListTotalTransactions } from '@/use-cases';

interface SutType {
  sut: ListTotalTransactions;
  listTotalTransactionsDto: ListTotalTransactionsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listTotalTransactionsRepository: ListTotalTransactionsRepository;
}

export const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listTotalTransactionsRepository =
    new ListTotalTransactionsRepositoryMock();

  const listTotalTransactionsDto: ListTotalTransactionsDto = {
    loggedUserId: UserMock.id,
    initialDate: new Date('2023-01-01'),
    finalDate: new Date('2023-12-31'),
  };

  const sut = new ListTotalTransactions(
    findUserByIdRepository,
    listTotalTransactionsRepository
  );

  return {
    sut,
    listTotalTransactionsDto,
    findUserByIdRepository,
    listTotalTransactionsRepository,
  };
};

describe('ListTotalTransactions', () => {
  it('should return list of total transactions when pass correct ListTotalTransactionsDto object', async () => {
    const { sut, listTotalTransactionsDto } = makeSut();

    const result = await sut.execute(listTotalTransactionsDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual([TotalTransactionsMock]);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listTotalTransactionsDto object', async () => {
    const { listTotalTransactionsDto, sut } = makeSut();
    listTotalTransactionsDto.loggedUserId = '';
    const result = await sut.execute(listTotalTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect initialDate in ListTotalTransactionsDto object', async () => {
    const { sut, listTotalTransactionsDto } = makeSut();
    listTotalTransactionsDto.initialDate = new Date('2023-06-51');
    const result = await sut.execute(listTotalTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect finalDate in ListTotalTransactionsDto object', async () => {
    const { sut, listTotalTransactionsDto } = makeSut();
    listTotalTransactionsDto.finalDate = new Date('2023-06-51');
    const result = await sut.execute(listTotalTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect finalDate in ListTotalTransactionsDto object', async () => {
    const { sut, listTotalTransactionsDto } = makeSut();
    listTotalTransactionsDto.finalDate = new Date('2023-06-51');
    const result = await sut.execute(listTotalTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityIsInvalid when pass finalDate greater than initialDate in ListTotalTransactionsDto object', async () => {
    const { sut, listTotalTransactionsDto } = makeSut();
    listTotalTransactionsDto.finalDate = new Date('2023-06-31');
    listTotalTransactionsDto.initialDate = new Date('2023-07-31');
    const result = await sut.execute(listTotalTransactionsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listTotalTransactionsDto object', async () => {
    const { listTotalTransactionsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listTotalTransactionsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
