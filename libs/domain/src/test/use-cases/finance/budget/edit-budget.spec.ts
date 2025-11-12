import { BudgetResponseDto, EditBudgetDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  EditBudgetRepository,
  FindBudgetByIdRepository,
  FindBudgetByNameRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { BudgetMock, UserMock } from '@/test/entities';
import {
  EditBudgetRepositoryMock,
  FindBudgetByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { EditBudget } from '@/use-cases';

interface SutTypes {
  sut: EditBudget;
  editBudgetDto: EditBudgetDto;
  findUserByIdRepository: FindUserByIdRepository;
  findBudgetByNameRepository: FindBudgetByNameRepository;
  findBudgetByIdRepository: FindBudgetByIdRepository;
  editBudgetRepository: EditBudgetRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findBudgetByNameRepository: FindBudgetByNameRepository = {
    find: jest.fn(async () => BudgetMock),
  };
  const findBudgetByIdRepository = new FindBudgetByIdRepositoryMock();
  const editBudgetRepository = new EditBudgetRepositoryMock();

  const editBudgetDto: EditBudgetDto = {
    id: BudgetMock.id,
    name: BudgetMock.name,
    description: BudgetMock.description,
    limitValue: BudgetMock.limitValue,
    loggedUserId: UserMock.id,
  };

  const sut = new EditBudget(
    findUserByIdRepository,
    findBudgetByNameRepository,
    findBudgetByIdRepository,
    editBudgetRepository
  );

  return {
    sut,
    editBudgetDto,
    findBudgetByNameRepository,
    findUserByIdRepository,
    findBudgetByIdRepository,
    editBudgetRepository,
  };
};

describe('EditBudget', () => {
  it('should return budget ID when pass correct editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();

    const result = await sut.execute(editBudgetDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(BudgetMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();
    editBudgetDto.loggedUserId = '';
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty fixed gains ID in editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();
    editBudgetDto.id = '';
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();
    editBudgetDto.name = '';
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();
    editBudgetDto.description = '';
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty limitValue in editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();
    editBudgetDto.limitValue = 0;
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass the budget with same name in the database', async () => {
    const { editBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetByNameRepository'], 'find')
      .mockResolvedValueOnce({
        ...BudgetMock,
        id: 'any_id',
      });
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when pass incorrect budget ID in editBudgetDto object', async () => {
    const { editBudgetDto, sut } = makeSut();
    jest
      .spyOn(sut['findBudgetByIdRepository'], 'find')
      .mockResolvedValueOnce({} as BudgetResponseDto);
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not edited budget in the database', async () => {
    const { editBudgetDto, sut } = makeSut();
    jest.spyOn(sut['editBudgetRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editBudgetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
