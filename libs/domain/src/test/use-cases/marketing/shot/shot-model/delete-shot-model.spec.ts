import { DeleteShotModelDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEmpty,
  EntityNotDeleted,
  EntityNotExists,
  EntityIsInvalid,
} from '@/errors';
import {
  FindUserByIdRepository,
  DeleteShotModelRepository,
  FindUserInShotModelRepository,
} from '@/repositories';
import { UserMock, ShotModelMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  DeleteShotModelRepositoryMock,
  FindUserInShotModelRepositoryMock,
} from '@/test/repositories';
import { DeleteShotModel } from '@/use-cases';

interface SutTypes {
  sut: DeleteShotModel;
  deleteShotModelDto: DeleteShotModelDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInShotModelRepository: FindUserInShotModelRepository;
  deleteShotModelRepository: DeleteShotModelRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInShotModelRepository = new FindUserInShotModelRepositoryMock();
  const deleteShotModelRepository = new DeleteShotModelRepositoryMock();

  const deleteShotModelDto: DeleteShotModelDto = {
    id: UserMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteShotModel(
    findUserByIdRepository,
    findUserInShotModelRepository,
    deleteShotModelRepository
  );

  return {
    sut,
    deleteShotModelDto,
    findUserByIdRepository,
    findUserInShotModelRepository,
    deleteShotModelRepository,
  };
};

describe('DeleteShotModel', () => {
  it('should return shot model ID when a pass correct user input in deleteShotModelDto object', async () => {
    const { sut, deleteShotModelDto } = makeSut();

    const result = await sut.execute(deleteShotModelDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(ShotModelMock.id);
  });

  it('should return EntityNotEmpty when pass empty id in deleteShotModelDto object', async () => {
    const { sut, deleteShotModelDto } = makeSut();
    deleteShotModelDto.id = '';
    const result = await sut.execute(deleteShotModelDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty logged user id in deleteShotModelDto object', async () => {
    const { sut, deleteShotModelDto } = makeSut();
    deleteShotModelDto.loggedUserId = '';
    const result = await sut.execute(deleteShotModelDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in deleteShotModelDto object', async () => {
    const { deleteShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteShotModelDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect ID or user ID in findUserInShotModelRepository', async () => {
    const { deleteShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotModelRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteShotModelDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotDeleted when not deleted shot model in system', async () => {
    const { sut, deleteShotModelDto } = makeSut();

    jest
      .spyOn(sut['deleteShotModelRepository'], 'delete')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deleteShotModelDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
