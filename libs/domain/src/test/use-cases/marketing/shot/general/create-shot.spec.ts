import { CreateShotDto, ShotModelResponseDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreateShotRepository,
  FindUserByIdRepository,
  FindShotByTitleRepository,
  FindShotModelByIdRepository,
} from '@/repositories';
import { ShotMock, UserMock } from '@/test/entities';
import {
  CreateShotRepositoryMock,
  FindUserByIdRepositoryMock,
  FindShotByTitleRepositoryMock,
  FindShotModelByIdRepositoryMock,
} from '@/test/repositories';
import { CreateShot } from '@/use-cases';

interface SutTypes {
  sut: CreateShot;
  createShotDto: CreateShotDto;
  findUserByIdRepository: FindUserByIdRepository;
  findShotByTitleRepository: FindShotByTitleRepository;
  findShotModelByIdRepository: FindShotModelByIdRepository;
  createShotRepository: CreateShotRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findShotByTitleRepository = new FindShotByTitleRepositoryMock();
  const findShotModelByIdRepository = new FindShotModelByIdRepositoryMock();
  const createShotRepository = new CreateShotRepositoryMock();

  const createShotDto: CreateShotDto = {
    loggedUserId: UserMock.id,
    modelId: ShotMock.modelId,
    title: ShotMock.title,
  };

  const sut = new CreateShot(
    findUserByIdRepository,
    findShotByTitleRepository,
    findShotModelByIdRepository,
    createShotRepository
  );

  return {
    sut,
    createShotDto,
    findUserByIdRepository,
    findShotModelByIdRepository,
    findShotByTitleRepository,
    createShotRepository,
  };
};

describe('CreateShot', () => {
  it('should return shot ID when pass correct createShotDto object', async () => {
    const { createShotDto, sut } = makeSut();

    const result = await sut.execute(createShotDto);

    expect(result.value).toStrictEqual(ShotMock.id);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in createShotDto object', async () => {
    const { createShotDto, sut } = makeSut();
    createShotDto.loggedUserId = '';
    const result = await sut.execute(createShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty model ID in createShotDto object', async () => {
    const { createShotDto, sut } = makeSut();
    createShotDto.modelId = '';
    const result = await sut.execute(createShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty title in createShotDto object', async () => {
    const { createShotDto, sut } = makeSut();
    createShotDto.title = '';
    const result = await sut.execute(createShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createShotDto object', async () => {
    const { createShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass incorrect title in createShotDto object', async () => {
    const { createShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotByTitleRepository'], 'find')
      .mockResolvedValueOnce(ShotMock);
    const result = await sut.execute(createShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when pass incorrect model ID in createShotDto object', async () => {
    const { createShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotModelByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ShotModelResponseDto);
    const result = await sut.execute(createShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when not created shot model in system', async () => {
    const { createShotDto, sut } = makeSut();
    jest.spyOn(sut['createShotRepository'], 'create').mockResolvedValueOnce('');
    const result = await sut.execute(createShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
