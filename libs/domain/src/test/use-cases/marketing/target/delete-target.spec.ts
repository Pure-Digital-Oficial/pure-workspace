import { DeleteTargetDto, TargetResponseDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEmpty,
  EntityNotDeleted,
  EntityNotExists,
  EntityIsInvalid,
} from '@/errors';
import {
  FindUserByIdRepository,
  DeleteTargetRepository,
  FindUserInTargetRepository,
} from '@/repositories';
import { UserMock, TargetMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  DeleteTargetRepositoryMock,
  FindUserInTargetRepositoryMock,
} from '@/test/repositories';
import { DeleteTarget } from '@/use-cases';

interface SutTypes {
  sut: DeleteTarget;
  deleteTargetDto: DeleteTargetDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInTargetRepository: FindUserInTargetRepository;
  deleteTargetRepository: DeleteTargetRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInTargetRepository = new FindUserInTargetRepositoryMock();
  const deleteTargetRepository = new DeleteTargetRepositoryMock();

  const deleteTargetDto: DeleteTargetDto = {
    id: UserMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteTarget(
    findUserByIdRepository,
    findUserInTargetRepository,
    deleteTargetRepository
  );

  return {
    sut,
    deleteTargetDto,
    findUserByIdRepository,
    findUserInTargetRepository,
    deleteTargetRepository,
  };
};

describe('DeleteTarget', () => {
  it('should return target ID when a pass correct user input in deleteTargetDto object', async () => {
    const { sut, deleteTargetDto } = makeSut();

    const result = await sut.execute(deleteTargetDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(TargetMock.id);
  });

  it('should return EntityNotEmpty when pass empty id in deleteTargetDto object', async () => {
    const { sut, deleteTargetDto } = makeSut();
    deleteTargetDto.id = '';
    const result = await sut.execute(deleteTargetDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty logged user id in deleteTargetDto object', async () => {
    const { sut, deleteTargetDto } = makeSut();
    deleteTargetDto.loggedUserId = '';
    const result = await sut.execute(deleteTargetDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in deleteTargetDto object', async () => {
    const { deleteTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteTargetDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect ID or user ID in findUserInTargetRepository', async () => {
    const { deleteTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTargetRepository'], 'find')
      .mockResolvedValueOnce({} as TargetResponseDto);
    const result = await sut.execute(deleteTargetDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotDeleted when not deleted target in system', async () => {
    const { sut, deleteTargetDto } = makeSut();

    jest
      .spyOn(sut['deleteTargetRepository'], 'delete')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deleteTargetDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
