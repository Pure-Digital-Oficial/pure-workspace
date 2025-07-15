import { DeleteTargetsDto, UserResponseDto } from '@/dtos';
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
  deleteTargetsDto: DeleteTargetsDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInTargetRepository: FindUserInTargetRepository;
  deleteTargetRepository: DeleteTargetRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInTargetRepository = new FindUserInTargetRepositoryMock();
  const deleteTargetRepository = new DeleteTargetRepositoryMock();

  const deleteTargetsDto: DeleteTargetsDto = {
    ids: [TargetMock.id],
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteTarget(
    findUserByIdRepository,
    findUserInTargetRepository,
    deleteTargetRepository
  );

  return {
    sut,
    deleteTargetsDto,
    findUserByIdRepository,
    findUserInTargetRepository,
    deleteTargetRepository,
  };
};

describe('DeleteTarget', () => {
  it('should return target ID when a pass correct user input in deleteTargetsDto object', async () => {
    const { sut, deleteTargetsDto } = makeSut();

    const result = await sut.execute(deleteTargetsDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual([TargetMock.id]);
  });

  it('should return EntityNotEmpty when pass empty id in deleteTargetsDto object', async () => {
    const { sut, deleteTargetsDto } = makeSut();
    deleteTargetsDto.ids = [];
    const result = await sut.execute(deleteTargetsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty logged user id in deleteTargetsDto object', async () => {
    const { sut, deleteTargetsDto } = makeSut();
    deleteTargetsDto.loggedUserId = '';
    const result = await sut.execute(deleteTargetsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in deleteTargetsDto object', async () => {
    const { deleteTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteTargetsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect ID or user ID in findUserInTargetRepository', async () => {
    const { deleteTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTargetRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteTargetsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotDeleted when not deleted target in system', async () => {
    const { sut, deleteTargetsDto } = makeSut();

    jest
      .spyOn(sut['deleteTargetRepository'], 'delete')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deleteTargetsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
