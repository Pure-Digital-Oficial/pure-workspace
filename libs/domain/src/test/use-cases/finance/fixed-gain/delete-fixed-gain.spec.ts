import {
  DeleteFixedGainDto,
  FixedGainResponseDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotDeleted, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  DeleteFixedGainRepository,
  FindFixedGainByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { FixedGainMock, UserMock } from '@/test/entities';
import {
  DeleteFixedGainRepositoryMock,
  FindFixedGainByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { DeleteFixedGain } from '@/use-cases';

interface SutTypes {
  sut: DeleteFixedGain;
  deleteFixedGainDto: DeleteFixedGainDto;
  findUserByIdRepository: FindUserByIdRepository;
  findFixedGainByIdRepository: FindFixedGainByIdRepository;
  deleteFixedGainRepository: DeleteFixedGainRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findFixedGainByIdRepository = new FindFixedGainByIdRepositoryMock();
  const deleteFixedGainRepository = new DeleteFixedGainRepositoryMock();

  const deleteFixedGainDto: DeleteFixedGainDto = {
    id: FixedGainMock.id,
    loggedUserId: UserMock.id,
  };

  const sut = new DeleteFixedGain(
    findUserByIdRepository,
    findFixedGainByIdRepository,
    deleteFixedGainRepository
  );

  return {
    sut,
    deleteFixedGainDto,
    findUserByIdRepository,
    findFixedGainByIdRepository,
    deleteFixedGainRepository,
  };
};

describe('DeleteFixedGain', () => {
  it('should return fixed gain ID when pass correct deleteFixedGainDto object', async () => {
    const { deleteFixedGainDto, sut } = makeSut();

    const result = await sut.execute(deleteFixedGainDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(FixedGainMock.id);
  });

  it('should return EntityNotEmpty when pass empty transaction ID in deleteFixedGainDto object', async () => {
    const { deleteFixedGainDto, sut } = makeSut();
    deleteFixedGainDto.id = '';
    const result = await sut.execute(deleteFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in deleteFixedGainDto object', async () => {
    const { deleteFixedGainDto, sut } = makeSut();
    deleteFixedGainDto.loggedUserId = '';
    const result = await sut.execute(deleteFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in deleteFixedGainDto object', async () => {
    const { deleteFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(deleteFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exists fixed gain in the database', async () => {
    const { deleteFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['findFixedGainByIdRepository'], 'find')
      .mockResolvedValueOnce({} as FixedGainResponseDto);
    const result = await sut.execute(deleteFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not deleted fixed gain in the database', async () => {
    const { deleteFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteFixedGainRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
