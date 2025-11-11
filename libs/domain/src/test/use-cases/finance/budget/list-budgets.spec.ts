import { ListBudgetsDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import { FindUserByIdRepository, ListBudgetsRepository } from '@/repositories';
import { ListBudgets } from '@/use-cases';
import { ListBudgetsMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListBudgetsRepositoryMock,
} from '@/test/repositories';

interface SutType {
  sut: ListBudgets;
  listBudgetsDto: ListBudgetsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listBudgetsRepository: ListBudgetsRepository;
}

const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listBudgetsRepository = new ListBudgetsRepositoryMock();

  const listBudgetsDto: ListBudgetsDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListBudgets(findUserByIdRepository, listBudgetsRepository);

  return {
    sut,
    listBudgetsDto,
    findUserByIdRepository,
    listBudgetsRepository,
  };
};

describe('ListBudgets', () => {
  it('should return budget list when pass correct listBudgetsDto object', async () => {
    const { listBudgetsDto, sut } = makeSut();

    const result = await sut.execute(listBudgetsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListBudgetsMock);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listBudgetsDto object', async () => {
    const { listBudgetsDto, sut } = makeSut();
    listBudgetsDto.loggedUserId = '';
    const result = await sut.execute(listBudgetsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listBudgetsDto object', async () => {
    const { listBudgetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listBudgetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
