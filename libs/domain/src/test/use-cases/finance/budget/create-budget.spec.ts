import { CreateBudgetDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreateBudgetRepository,
  FindBudgetByNameRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { BudgetMock, UserMock } from '@/test/entities';
import {
  CreateBudgetRepositoryMock,
  FindBudgetByNameRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateBudget } from '@/use-cases';

interface SutTypes {
  sut: CreateBudget;
  createBudgetDto: CreateBudgetDto;
  findUserByIdRepository: FindUserByIdRepository;
  findBudgetByNameRepository: FindBudgetByNameRepository;
  createBudgetRepository: CreateBudgetRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findBudgetByNameRepository = new FindBudgetByNameRepositoryMock();
  const createBudgetRepository = new CreateBudgetRepositoryMock();

  const createBudgetDto: CreateBudgetDto = {
    description: BudgetMock.description,
    limitValue: BudgetMock.limitValue,
    loggedUserId: UserMock.id,
    name: BudgetMock.name,
  };

  const sut = new CreateBudget(
    findUserByIdRepository,
    findBudgetByNameRepository,
    createBudgetRepository
  );

  return {
    sut,
    createBudgetDto,
    findUserByIdRepository,
    findBudgetByNameRepository,
    createBudgetRepository,
  };
};

describe('CreateBudget', () => {
  it('should return budget ID when pass correct createBudgetDto object', async () => {
    const { createBudgetDto, sut } = makeSut();

    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(BudgetMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in createBudgetDto object', async () => {
    const { createBudgetDto, sut } = makeSut();
    createBudgetDto.loggedUserId = '';
    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in createBudgetDto object', async () => {
    const { createBudgetDto, sut } = makeSut();
    createBudgetDto.description = '';
    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty limitValue in createBudgetDto object', async () => {
    const { createBudgetDto, sut } = makeSut();
    createBudgetDto.limitValue = 0;
    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in createBudgetDto object', async () => {
    const { createBudgetDto, sut } = makeSut();
    createBudgetDto.name = '';
    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createBudgetDto object', async () => {
    const { createBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass the same name in the database', async () => {
    const { createBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetByNameRepository'], 'find')
      .mockResolvedValueOnce(BudgetMock);
    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not created budget in the database', async () => {
    const { createBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['createBudgetRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
