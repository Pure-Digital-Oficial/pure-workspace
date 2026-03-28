import {
  ConfirmManualPaymentDto,
  CustomerResponseDto,
  PaymentHistoryResponseDto,
  PaymentPlataformResponseDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotConfirmed, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  ConfirmManualPaymentRepository,
  FindCustomerByIdRepository,
  FindPaymentHistoryByCustomerIdRepository,
  FindPaymentPlataformByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  ConfirmManualPaymentMock,
  CustomerMock,
  PaymentPlataformMock,
  UserMock,
} from '@/test/entities';
import {
  ConfirmManualPaymentRepositoryMock,
  FindCustomerByIdRepositoryMock,
  FindPaymentHistoryByCustomerIdRepositoryMock,
  FindPaymentPlataformByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { ConfirmManualPayment } from '@/use-cases';

interface SutTypes {
  sut: ConfirmManualPayment;
  confirmManualPaymentDto: ConfirmManualPaymentDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCustomerByIdRepository: FindCustomerByIdRepository;
  findPaymentHistoryByCustomerIdRepository: FindPaymentHistoryByCustomerIdRepository;
  findPaymentPlataformByIdRepository: FindPaymentPlataformByIdRepository;
  confirmManualPaymentRepository: ConfirmManualPaymentRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCustomerByIdRepository = new FindCustomerByIdRepositoryMock();
  const findPaymentHistoryByCustomerIdRepository =
    new FindPaymentHistoryByCustomerIdRepositoryMock();
  const confirmManualPaymentRepository =
    new ConfirmManualPaymentRepositoryMock();

  const findPaymentPlataformByIdRepository =
    new FindPaymentPlataformByIdRepositoryMock();

  const confirmManualPaymentDto: ConfirmManualPaymentDto = {
    customerId: CustomerMock.id,
    loggedUserId: UserMock.id,
    paymentPlataformId: PaymentPlataformMock.id,
  };

  const sut = new ConfirmManualPayment(
    findUserByIdRepository,
    findCustomerByIdRepository,
    findPaymentHistoryByCustomerIdRepository,
    findPaymentPlataformByIdRepository,
    confirmManualPaymentRepository
  );

  return {
    sut,
    confirmManualPaymentDto,
    findUserByIdRepository,
    findCustomerByIdRepository,
    findPaymentHistoryByCustomerIdRepository,
    findPaymentPlataformByIdRepository,
    confirmManualPaymentRepository,
  };
};

describe('ConfirmManualPayment', () => {
  it('Should return status payment when pass correct confirmManualPaymentDto object', async () => {
    const { confirmManualPaymentDto, sut } = makeSut();

    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ConfirmManualPaymentMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in confirmManualPaymentDto', async () => {
    const { sut, confirmManualPaymentDto } = makeSut();
    confirmManualPaymentDto.loggedUserId = '';

    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect customerId in confirmManualPaymentDto', async () => {
    const { sut, confirmManualPaymentDto } = makeSut();
    confirmManualPaymentDto.customerId = '';

    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in confirmManualPaymentDto object', async () => {
    const { confirmManualPaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect customerId in confirmManualPaymentDto object', async () => {
    const { confirmManualPaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findCustomerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CustomerResponseDto);
    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect customerId in confirmManualPaymentDto object', async () => {
    const { confirmManualPaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findPaymentHistoryByCustomerIdRepository'], 'find')
      .mockResolvedValueOnce({} as PaymentHistoryResponseDto);
    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect paymentPlataformId in confirmManualPaymentDto object', async () => {
    const { confirmManualPaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['findPaymentPlataformByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PaymentPlataformResponseDto);
    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotConfirmed when net confirmed payment in the system', async () => {
    const { confirmManualPaymentDto, sut } = makeSut();
    jest
      .spyOn(sut['confirmManualPaymentRepository'], 'confirm')
      .mockResolvedValueOnce('');
    const result = await sut.execute(confirmManualPaymentDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotConfirmed);
  });
});
