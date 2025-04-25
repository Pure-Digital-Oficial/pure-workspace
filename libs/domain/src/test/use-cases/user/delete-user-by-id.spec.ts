import { DeleteUserByIdDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotDeleted, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  DeleteUserByIdRepository,
} from '@/repositories';
import { UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  DeleteUserByIdRepositoryMock,
} from '@/test/repositories';
import { DeleteUserById } from '@/use-cases';
import { faker } from '@faker-js/faker/.';

interface SutTypes {
  sut: DeleteUserById;
  deleteUserByIdDto: DeleteUserByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  deleteUserByIdRepository: DeleteUserByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const deleteUserByIdRepository = new DeleteUserByIdRepositoryMock();

  const deleteUserByIdDto: DeleteUserByIdDto = {
    id: UserMock.id,
    description: faker.string.alpha(3),
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteUserById(
    findUserByIdRepository,
    deleteUserByIdRepository
  );

  return {
    sut,
    deleteUserByIdDto,
    findUserByIdRepository,
    deleteUserByIdRepository,
  };
};

describe('DeleteUserById', () => {
  it('should return user ID when a pass correct user input in deleteUserByIdDto object', async () => {
    const { sut, deleteUserByIdDto } = makeSut();

    const result = await sut.execute(deleteUserByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(UserMock.id);
  });

  it('should return EntityNotEmpty when pass empty description in deleteUserByIdDto object', async () => {
    const { sut, deleteUserByIdDto } = makeSut();
    deleteUserByIdDto.description = '';
    const result = await sut.execute(deleteUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty id in deleteUserByIdDto object', async () => {
    const { sut, deleteUserByIdDto } = makeSut();
    deleteUserByIdDto.id = '';
    const result = await sut.execute(deleteUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty logged user id in deleteUserByIdDto object', async () => {
    const { sut, deleteUserByIdDto } = makeSut();
    deleteUserByIdDto.loggedUserId = '';
    const result = await sut.execute(deleteUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in deleteUserByIdDto object', async () => {
    const { deleteUserByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotDeleted when not deleted user in system', async () => {
    const { sut, deleteUserByIdDto } = makeSut();

    jest
      .spyOn(sut['deleteUserByIdRepository'], 'delete')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deleteUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
