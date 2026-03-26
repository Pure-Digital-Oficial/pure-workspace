import { ListPaymentMethodsDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListPaymentMethodsRepository,
} from '@/repositories';
import { ListPaymentMethodsMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListPaymentMethodsRepositoryMock,
} from '@/test/repositories';
import { ListPaymentMethods } from '@/use-cases';

interface SutTypes {
  sut: ListPaymentMethods;
  listPaymentMethodsDto: ListPaymentMethodsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listPaymentMethodsRepository: ListPaymentMethodsRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listPaymentMethodsRepository = new ListPaymentMethodsRepositoryMock();

  const listPaymentMethodsDto: ListPaymentMethodsDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListPaymentMethods(
    findUserByIdRepository,
    listPaymentMethodsRepository
  );

  return {
    sut,
    listPaymentMethodsDto,
    findUserByIdRepository,
    listPaymentMethodsRepository,
  };
};

describe('ListPaymentMethods', () => {
  it('should return List Payment Methods when pass correct listPaymentMethodsDto object', async () => {
    const { listPaymentMethodsDto, sut } = makeSut();

    const result = await sut.execute(listPaymentMethodsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListPaymentMethodsMock);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in listPaymentMethodsDto', async () => {
    const { sut, listPaymentMethodsDto } = makeSut();
    listPaymentMethodsDto.loggedUserId = '';

    const result = await sut.execute(listPaymentMethodsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listPaymentMethodsDto object', async () => {
    const { listPaymentMethodsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listPaymentMethodsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
