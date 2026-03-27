import {
  ConfirmManualPaymentDto,
  CustomerResponseDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotConfirmed, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  ConfirmManualPaymentRepository,
  FindCustomerByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  ConfirmManualPaymentMock,
  CustomerMock,
  UserMock,
} from '@/test/entities';
import {
  ConfirmManualPaymentRepositoryMock,
  FindCustomerByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { ConfirmManualPayment } from '@/use-cases';

interface SutTypes {
  sut: ConfirmManualPayment;
  confirmManualPaymentDto: ConfirmManualPaymentDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCustomerByIdRepository: FindCustomerByIdRepository;
  confirmManualPaymentRepository: ConfirmManualPaymentRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCustomerByIdRepository = new FindCustomerByIdRepositoryMock();
  const confirmManualPaymentRepository =
    new ConfirmManualPaymentRepositoryMock();

  const confirmManualPaymentDto: ConfirmManualPaymentDto = {
    customerId: CustomerMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new ConfirmManualPayment(
    findUserByIdRepository,
    findCustomerByIdRepository,
    confirmManualPaymentRepository
  );

  return {
    sut,
    confirmManualPaymentDto,
    findUserByIdRepository,
    findCustomerByIdRepository,
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
