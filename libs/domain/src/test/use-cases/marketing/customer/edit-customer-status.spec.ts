import {
  CustomerResponseDto,
  EditCustomerStatusDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotEdited, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  EditCustomerStatusRepository,
  FindCustomerByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { CustomerMock, UserMock } from '@/test/entities';
import {
  EditCustomerStatusRepositoryMock,
  FindCustomerByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { EditCustomerStatus } from '@/use-cases';

interface sutTypes {
  sut: EditCustomerStatus;
  editCustomerStatusDto: EditCustomerStatusDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCustomerByIdRepository: FindCustomerByIdRepository;
  editCustomerStatusRepository: EditCustomerStatusRepository;
}

const makeSut = (): sutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCustomerByIdRepository = new FindCustomerByIdRepositoryMock();
  const editCustomerStatusRepository = new EditCustomerStatusRepositoryMock();

  const editCustomerStatusDto: EditCustomerStatusDto = {
    id: CustomerMock.id,
    status: CustomerMock.status,
    loggedUserId: UserMock.id,
  };

  const sut = new EditCustomerStatus(
    findUserByIdRepository,
    findCustomerByIdRepository,
    editCustomerStatusRepository
  );
  return {
    sut,
    editCustomerStatusDto,
    findUserByIdRepository,
    findCustomerByIdRepository,
    editCustomerStatusRepository,
  };
};

describe('EditCustomerStatus', () => {
  it('should return Customer ID when pass correct editCustomerStatusDto object', async () => {
    const { sut, editCustomerStatusDto } = makeSut();

    const result = await sut.execute(editCustomerStatusDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBe(CustomerMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in editCustomerStatusDto object', async () => {
    const { editCustomerStatusDto, sut } = makeSut();
    editCustomerStatusDto.loggedUserId = '';
    const result = await sut.execute(editCustomerStatusDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty Customer ID in editCustomerStatusDto object', async () => {
    const { editCustomerStatusDto, sut } = makeSut();
    editCustomerStatusDto.id = '';
    const result = await sut.execute(editCustomerStatusDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty Status in editCustomerStatusDto object', async () => {
    const { editCustomerStatusDto, sut } = makeSut();
    editCustomerStatusDto.status = '';
    const result = await sut.execute(editCustomerStatusDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in editCustomerStatusDto object', async () => {
    const { editCustomerStatusDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editCustomerStatusDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass icorrect id in editCustomerStatusDto object', async () => {
    const { editCustomerStatusDto, sut } = makeSut();
    jest
      .spyOn(sut['findCustomerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CustomerResponseDto);
    const result = await sut.execute(editCustomerStatusDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not edited customer status in the database', async () => {
    const { editCustomerStatusDto, sut } = makeSut();
    jest
      .spyOn(sut['editCustomerStatusRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editCustomerStatusDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
