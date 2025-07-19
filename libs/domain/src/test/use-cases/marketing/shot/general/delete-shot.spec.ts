import { DeleteShotDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEmpty,
  EntityNotDeleted,
  EntityNotExists,
  EntityIsInvalid,
} from '@/errors';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  DeleteShotRepository,
} from '@/repositories';
import { UserMock, ShotMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  DeleteShotRepositoryMock,
  FindUserInShotRepositoryMock,
} from '@/test/repositories';
import { DeleteShot } from '@/use-cases';

interface SutTypes {
  sut: DeleteShot;
  deleteShotDto: DeleteShotDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInShotRepository: FindUserInShotRepository;
  deleteShotRepository: DeleteShotRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInShotRepository = new FindUserInShotRepositoryMock();
  const deleteShotRepository = new DeleteShotRepositoryMock();

  const deleteShotDto: DeleteShotDto = {
    id: UserMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteShot(
    findUserByIdRepository,
    findUserInShotRepository,
    deleteShotRepository
  );

  return {
    sut,
    deleteShotDto,
    findUserByIdRepository,
    findUserInShotRepository,
    deleteShotRepository,
  };
};

describe('DeleteShot', () => {
  it('should return shot ID when a pass correct user input in deleteShotDto object', async () => {
    const { sut, deleteShotDto } = makeSut();

    const result = await sut.execute(deleteShotDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(ShotMock.id);
  });

  it('should return EntityNotEmpty when pass empty id in deleteShotDto object', async () => {
    const { sut, deleteShotDto } = makeSut();
    deleteShotDto.id = '';
    const result = await sut.execute(deleteShotDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty logged user id in deleteShotDto object', async () => {
    const { sut, deleteShotDto } = makeSut();
    deleteShotDto.loggedUserId = '';
    const result = await sut.execute(deleteShotDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in deleteShotDto object', async () => {
    const { deleteShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteShotDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect ID or user ID in findUserInShotRepository', async () => {
    const { deleteShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteShotDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotDeleted when not deleted shot model in system', async () => {
    const { sut, deleteShotDto } = makeSut();

    jest.spyOn(sut['deleteShotRepository'], 'delete').mockResolvedValueOnce('');

    const result = await sut.execute(deleteShotDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
