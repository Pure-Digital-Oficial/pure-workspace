import {
  CharacterResponseDto,
  CreatePaymentHistoryDto,
  CustomerResponseDto,
  PaymentHistoryResponseDto,
  PlanResponseDto,
  UserResponseDto,
} from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreatePaymentHistoryRepository,
  FindCharacterByIdRepository,
  FindCustomerByIdRepository,
  FindPaymentHistoryByExternalIdRepository,
  FindPlanByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { PaymentHistoryMock, UserMock } from '@/test/entities';
import {
  CreatePaymentHistoryRepositoryMock,
  FindCharacterByIdRepositoryMock,
  FindCustomerByIdRepositoryMock,
  FindPlanByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreatePaymentHistory } from '@/use-cases';

interface SutTypes {
  sut: CreatePaymentHistory;
  createPaymentHistoryDto: CreatePaymentHistoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCharacterByIdRepository: FindCharacterByIdRepository;
  findCustomerByIdRepository: FindCustomerByIdRepository;
  findPlanByIdRepository: FindPlanByIdRepository;
  findPaymenHistoryByExternalIdRepository: FindPaymentHistoryByExternalIdRepository;
  createPaymentHistoryRepository: CreatePaymentHistoryRepository;
}

const makeSut = (): SutTypes => {
  const emptyMock = {};
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCharacterByIdRepository = new FindCharacterByIdRepositoryMock();
  const findCustomerByIdRepository = new FindCustomerByIdRepositoryMock();
  const findPaymenHistoryByExternalIdRepository: FindPaymentHistoryByExternalIdRepository =
    {
      find: jest.fn(async () => emptyMock as PaymentHistoryResponseDto),
    };
  const findPlanByIdRepository = new FindPlanByIdRepositoryMock();
  const createPaymentHistoryRepository =
    new CreatePaymentHistoryRepositoryMock();

  const createPaymentHistoryDto: CreatePaymentHistoryDto = {
    loggedUserId: UserMock.id,
    customerId: PaymentHistoryMock.customerId,
    characterId: PaymentHistoryMock.characterId,
    externalId: PaymentHistoryMock.externalId,
    amount: PaymentHistoryMock.amount,
    planId: PaymentHistoryMock.planId,
  };

  const sut = new CreatePaymentHistory(
    findUserByIdRepository,
    findCharacterByIdRepository,
    findCustomerByIdRepository,
    findPlanByIdRepository,
    findPaymenHistoryByExternalIdRepository,
    createPaymentHistoryRepository
  );

  return {
    sut,
    createPaymentHistoryDto,
    findUserByIdRepository,
    findCharacterByIdRepository,
    findCustomerByIdRepository,
    findPlanByIdRepository,
    findPaymenHistoryByExternalIdRepository,
    createPaymentHistoryRepository,
  };
};

describe('CreatePaymentHistory', () => {
  it('Should return Payment History ID when pass correct createPaymentHistoryDto object', async () => {
    const { createPaymentHistoryDto, sut } = makeSut();

    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(PaymentHistoryMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in createPaymentHistoryDto', async () => {
    const { sut, createPaymentHistoryDto } = makeSut();
    createPaymentHistoryDto.loggedUserId = '';

    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });
  it('should return EntityNotEmpty when pass incorrect planId in createPaymentHistoryDto', async () => {
    const { sut, createPaymentHistoryDto } = makeSut();
    createPaymentHistoryDto.planId = '';

    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect characterId in createPaymentHistoryDto', async () => {
    const { sut, createPaymentHistoryDto } = makeSut();
    createPaymentHistoryDto.characterId = '';

    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect customerId in createPaymentHistoryDto', async () => {
    const { sut, createPaymentHistoryDto } = makeSut();
    createPaymentHistoryDto.customerId = '';

    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect externalId in createPaymentHistoryDto', async () => {
    const { sut, createPaymentHistoryDto } = makeSut();
    createPaymentHistoryDto.externalId = 0;

    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect amount in createPaymentHistoryDto', async () => {
    const { sut, createPaymentHistoryDto } = makeSut();
    createPaymentHistoryDto.amount = 0;

    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createPaymentHistoryDto object', async () => {
    const { createPaymentHistoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect planId in createPaymentHistoryDto object', async () => {
    const { createPaymentHistoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlanByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlanResponseDto);
    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect characterId in createPaymentHistoryDto object', async () => {
    const { createPaymentHistoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findCharacterByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CharacterResponseDto);
    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect customerId in createPaymentHistoryDto object', async () => {
    const { createPaymentHistoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findCustomerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CustomerResponseDto);
    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when exists externalId in the database', async () => {
    const { createPaymentHistoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findPaymenHistoryByExternalIdRepository'], 'find')
      .mockResolvedValueOnce(PaymentHistoryMock);
    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not created payment history in the database', async () => {
    const { createPaymentHistoryDto, sut } = makeSut();
    jest
      .spyOn(sut['createPaymentHistoryRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createPaymentHistoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
