import { faker } from '@faker-js/faker';
import {
  GeneratePaymentDto,
  GeneratePaymentResponseDto,
  PaymentMethodResponseDto,
  PaymentPlataformResponseDto,
  PlanResponseDto,
  UserResponseDto,
} from '@/dtos';
import {
  FindPaymentMethodWithPlataformByIdsRepository,
  FindPaymentPlataformByIdRepository,
  FindPlanByIdRepository,
  FindUserByIdRepository,
  GeneratePaymentRepository,
  FindPaymentMethodByIdRepository,
} from '@/repositories';
import {
  GeneratePaymentMock,
  PaymentMethodMock,
  PaymentPlataformMock,
  PlanMock,
  UserMock,
} from '@/test/entities';
import {
  FindPaymentMethodRepositoryMock,
  FindPaymentPlataformByIdRepositoryMock,
  FindPlanByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  GeneratePaymentRepositoryMock,
  FindPaymentMethodWithPlataformByIdsRepositoryMock,
} from '@/test/repositories';
import { GeneratePayment } from '@/use-cases';
import { EntityNotCreated, EntityNotEmpty, EntityNotExists } from '@/errors';

interface SutTypes {
  sut: GeneratePayment;
  generatePaymentDto: GeneratePaymentDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPaymentPlataformByIdRepository: FindPaymentPlataformByIdRepository;
  findPaymentMethodByIdRepository: FindPaymentMethodByIdRepository;
  findPlanByIdRepository: FindPlanByIdRepository;
  findPaymentMethodWithPlataformByIdsRepository: FindPaymentMethodWithPlataformByIdsRepository;
  generatePaymentRepository: GeneratePaymentRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPaymentPlataformByIdRepository =
    new FindPaymentPlataformByIdRepositoryMock();
  const findPaymentMethodByIdRepository = new FindPaymentMethodRepositoryMock();
  const findPlanByIdRepository = new FindPlanByIdRepositoryMock();
  const findPaymentMethodWithPlataformByIdsRepository =
    new FindPaymentMethodWithPlataformByIdsRepositoryMock();
  const generatePaymentRepository = new GeneratePaymentRepositoryMock();

  const generatePaymentDto: GeneratePaymentDto = {
    loggedUserId: UserMock.id,
    payerEmail: faker.internet.email(),
    paymentMethodId: PaymentMethodMock.id,
    paymentPlataformId: PaymentPlataformMock.id,
    planId: PlanMock.id,
  };

  const sut = new GeneratePayment(
    findUserByIdRepository,
    findPaymentPlataformByIdRepository,
    findPaymentMethodByIdRepository,
    findPlanByIdRepository,
    findPaymentMethodWithPlataformByIdsRepository,
    generatePaymentRepository
  );

  return {
    sut,
    generatePaymentDto,
    findUserByIdRepository,
    findPaymentPlataformByIdRepository,
    findPaymentMethodByIdRepository,
    findPlanByIdRepository,
    findPaymentMethodWithPlataformByIdsRepository,
    generatePaymentRepository,
  };
};

describe('GeneratePayment', () => {
  it('Should return Generate payment object when pass correct GeneratePaymentDto object', async () => {
    const { generatePaymentDto, sut } = makeSut();

    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(GeneratePaymentMock);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in generatePaymentDto', async () => {
    const { sut, generatePaymentDto } = makeSut();
    generatePaymentDto.loggedUserId = '';

    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect payer email in generatePaymentDto', async () => {
    const { sut, generatePaymentDto } = makeSut();
    generatePaymentDto.payerEmail = '';

    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect paymentMethodId in generatePaymentDto', async () => {
    const { sut, generatePaymentDto } = makeSut();
    generatePaymentDto.paymentMethodId = '';

    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect paymentPlataformId in generatePaymentDto', async () => {
    const { sut, generatePaymentDto } = makeSut();
    generatePaymentDto.paymentPlataformId = '';

    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect planId in generatePaymentDto', async () => {
    const { sut, generatePaymentDto } = makeSut();
    generatePaymentDto.planId = '';

    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in generatePaymentDto object', async () => {
    const { generatePaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect paymentMethodId in generatePaymentDto object', async () => {
    const { generatePaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findPaymentMethodByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PaymentMethodResponseDto);
    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect paymentPlataformId in generatePaymentDto object', async () => {
    const { generatePaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findPaymentPlataformByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PaymentPlataformResponseDto);
    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect planId in generatePaymentDto object', async () => {
    const { generatePaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlanByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlanResponseDto);
    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect paymentMethodId or paymentPlataformId in generatePaymentDto object', async () => {
    const { generatePaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findPaymentMethodWithPlataformByIdsRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when not generated payment in the external api', async () => {
    const { generatePaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['generatePaymentRepository'], 'generate')
      .mockResolvedValueOnce({} as GeneratePaymentResponseDto);
    const result = await sut.execute(generatePaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
