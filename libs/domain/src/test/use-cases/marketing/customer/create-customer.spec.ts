import { CreateCustomerDto, UserResponseDto } from '@/dtos';
import {
  CreateCustomerRepository,
  FindCustomerByExternalIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { CustomerMock, UserMock } from '@/test/entities';
import {
  CreateCustomerRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateCustomer } from '@/use-cases';
import { CustomerResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';

interface sutTypes {
  sut: CreateCustomer;
  createCustomerDto: CreateCustomerDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCustomerByExternalIdRepository: FindCustomerByExternalIdRepository;
  createCustomerRepository: CreateCustomerRepository;
}

const makeSut = (): sutTypes => {
  const emptyMock = {};
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCustomerByExternalIdRepository: FindCustomerByExternalIdRepository =
    {
      find: jest.fn(async () => emptyMock as CustomerResponseDto),
    };
  const createCustomerRepository = new CreateCustomerRepositoryMock();

  const createCustomerDto: CreateCustomerDto = {
    loggedUserId: UserMock.id,
    name: CustomerMock.name,
    externalId: CustomerMock.externalId,
  };

  const sut = new CreateCustomer(
    findUserByIdRepository,
    findCustomerByExternalIdRepository,
    createCustomerRepository
  );

  return {
    sut,
    createCustomerDto,
    findUserByIdRepository,
    findCustomerByExternalIdRepository,
    createCustomerRepository,
  };
};

describe('CreateCustomer', () => {
  it('should return Customer ID when pass correct createCustomerDto object', async () => {
    const { sut, createCustomerDto } = makeSut();

    const result = await sut.execute(createCustomerDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(CustomerMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in createCustomerDto object', async () => {
    const { createCustomerDto, sut } = makeSut();
    createCustomerDto.loggedUserId = '';
    const result = await sut.execute(createCustomerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty externalId in createCustomerDto object', async () => {
    const { createCustomerDto, sut } = makeSut();
    createCustomerDto.externalId = '';
    const result = await sut.execute(createCustomerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in createCustomerDto object', async () => {
    const { createCustomerDto, sut } = makeSut();
    createCustomerDto.name = '';
    const result = await sut.execute(createCustomerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createCustomerDto object', async () => {
    const { createCustomerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createCustomerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass existing externalId in createCustomerDto object', async () => {
    const { createCustomerDto, sut } = makeSut();
    jest
      .spyOn(sut['findCustomerByExternalIdRepository'], 'find')
      .mockResolvedValueOnce(CustomerMock);
    const result = await sut.execute(createCustomerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not able to create customer', async () => {
    const { createCustomerDto, sut } = makeSut();
    jest
      .spyOn(sut['createCustomerRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createCustomerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
