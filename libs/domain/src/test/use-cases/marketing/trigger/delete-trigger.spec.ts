import { DeleteTriggerDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEmpty,
  EntityNotDeleted,
  EntityNotExists,
  EntityIsInvalid,
} from '@/errors';
import {
  FindUserByIdRepository,
  DeleteTriggerRepository,
  FindUserInTriggerRepository,
} from '@/repositories';
import { UserMock, TriggerMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  DeleteTriggerRepositoryMock,
  FindUserInTriggerRepositoryMock,
} from '@/test/repositories';
import { DeleteTrigger } from '@/use-cases';

interface SutTypes {
  sut: DeleteTrigger;
  deleteTriggerDto: DeleteTriggerDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInTriggerRepository: FindUserInTriggerRepository;
  deleteTriggerRepository: DeleteTriggerRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInTriggerRepository = new FindUserInTriggerRepositoryMock();
  const deleteTriggerRepository = new DeleteTriggerRepositoryMock();

  const deleteTriggerDto: DeleteTriggerDto = {
    id: UserMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteTrigger(
    findUserByIdRepository,
    findUserInTriggerRepository,
    deleteTriggerRepository
  );

  return {
    sut,
    deleteTriggerDto,
    findUserByIdRepository,
    findUserInTriggerRepository,
    deleteTriggerRepository,
  };
};

describe('DeleteTrigger', () => {
  it('should return trigger ID when a pass correct user input in deleteTriggerDto object', async () => {
    const { sut, deleteTriggerDto } = makeSut();

    const result = await sut.execute(deleteTriggerDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(TriggerMock.id);
  });

  it('should return EntityNotEmpty when pass empty id in deleteTriggerDto object', async () => {
    const { sut, deleteTriggerDto } = makeSut();
    deleteTriggerDto.id = '';
    const result = await sut.execute(deleteTriggerDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty logged user id in deleteTriggerDto object', async () => {
    const { sut, deleteTriggerDto } = makeSut();
    deleteTriggerDto.loggedUserId = '';
    const result = await sut.execute(deleteTriggerDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in deleteTriggerDto object', async () => {
    const { deleteTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteTriggerDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect ID or user ID in findUserInTriggerRepository', async () => {
    const { deleteTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTriggerRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteTriggerDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotDeleted when not deleted user in system', async () => {
    const { sut, deleteTriggerDto } = makeSut();

    jest
      .spyOn(sut['deleteTriggerRepository'], 'delete')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deleteTriggerDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
