import { CreateShotModelDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreateShotModelRepository,
  FindShotModelBySubjectRepository,
  FindShotModelByTitleRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { ShotModelMock, UserMock } from '@/test/entities';
import {
  CreateShotModelRepositoryMock,
  FindShotModelBySubjectRepositoryMock,
  FindShotModelByTitleRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateShotModel } from '@/use-cases';

interface SutTypes {
  sut: CreateShotModel;
  createShotModelDto: CreateShotModelDto;
  findUserByIdRepository: FindUserByIdRepository;
  findShotModelByTitleRepository: FindShotModelByTitleRepository;
  findShotModelBySubjectRepository: FindShotModelBySubjectRepository;
  createShotModelRepository: CreateShotModelRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findShotModelByTitleRepository =
    new FindShotModelByTitleRepositoryMock();
  const findShotModelBySubjectRepository =
    new FindShotModelBySubjectRepositoryMock();
  const createShotModelRepository = new CreateShotModelRepositoryMock();

  const createShotModelDto: CreateShotModelDto = {
    body: ShotModelMock.body,
    loggedUserId: UserMock.id,
    subject: ShotModelMock.subject,
    title: ShotModelMock.title,
  };

  const sut = new CreateShotModel(
    findUserByIdRepository,
    findShotModelByTitleRepository,
    findShotModelBySubjectRepository,
    createShotModelRepository
  );

  return {
    sut,
    createShotModelDto,
    findUserByIdRepository,
    findShotModelByTitleRepository,
    findShotModelBySubjectRepository,
    createShotModelRepository,
  };
};

describe('CreateShotModel', () => {
  it('should return shot model ID when pass correct createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();

    const result = await sut.execute(createShotModelDto);

    expect(result.value).toStrictEqual(ShotModelMock.id);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();
    createShotModelDto.loggedUserId = '';
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty body in createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();
    createShotModelDto.body = '';
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty subject in createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();
    createShotModelDto.subject = '';
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty title in createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();
    createShotModelDto.title = '';
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass incorrect title in createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotModelByTitleRepository'], 'find')
      .mockResolvedValueOnce(ShotModelMock);
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityAlreadyExists when pass incorrect subject in createShotModelDto object', async () => {
    const { createShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotModelBySubjectRepository'], 'find')
      .mockResolvedValueOnce(ShotModelMock);
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not created shot model in system', async () => {
    const { createShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['createShotModelRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
