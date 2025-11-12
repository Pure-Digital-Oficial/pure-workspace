import { BudgetResponseDto, DeleteBudgetDto, UserResponseDto } from '@/dtos';
import { EntityNotDeleted, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  DeleteBudgetRepository,
  FindBudgetByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { BudgetMock, UserMock } from '@/test/entities';
import {
  DeleteBudgetRepositoryMock,
  FindBudgetByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { DeleteBudget } from '@/use-cases';

interface SutTypes {
  sut: DeleteBudget;
  deleteBudgetDto: DeleteBudgetDto;
  findUserByIdRepository: FindUserByIdRepository;
  findBudgetByIdRepository: FindBudgetByIdRepository;
  deleteBudgetRepository: DeleteBudgetRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findBudgetByIdRepository = new FindBudgetByIdRepositoryMock();
  const deleteBudgetRepository = new DeleteBudgetRepositoryMock();

  const deleteBudgetDto: DeleteBudgetDto = {
    id: BudgetMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteBudget(
    findUserByIdRepository,
    findBudgetByIdRepository,
    deleteBudgetRepository
  );

  return {
    sut,
    deleteBudgetDto,
    findUserByIdRepository,
    findBudgetByIdRepository,
    deleteBudgetRepository,
  };
};

describe('DeleteBudget', () => {
  it('should return budget ID when pass correct deleteBudgetDto object', async () => {
    const { deleteBudgetDto, sut } = makeSut();

    const result = await sut.execute(deleteBudgetDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(BudgetMock.id);
  });

  it('should return EntityNotEmpty when pass empty transaction ID in deleteBudgetDto object', async () => {
    const { deleteBudgetDto, sut } = makeSut();
    deleteBudgetDto.id = '';
    const result = await sut.execute(deleteBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in deleteBudgetDto object', async () => {
    const { deleteBudgetDto, sut } = makeSut();
    deleteBudgetDto.loggedUserId = '';
    const result = await sut.execute(deleteBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in deleteBudgetDto object', async () => {
    const { deleteBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exists budget in the database', async () => {
    const { deleteBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetByIdRepository'], 'find')
      .mockResolvedValueOnce({} as BudgetResponseDto);
    const result = await sut.execute(deleteBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not deleted budget in the database', async () => {
    const { deleteBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteBudgetRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
