import {
  CreateUniqueTargetDto,
  TriggerResponseDto,
  UserResponseDto,
} from '@/dtos';
import {
  CreateUniqueTargetRepository,
  FindTargetByContentRepository,
  FindTriggerByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  CreateUniqueTargetRepositoryMock,
  FindTriggerByIdRepositoryMock,
  FindTargetByContentRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateUniqueTarget } from '@/use-cases';
import { TargetMock } from '@/test/entities';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '@/errors';

interface SutTypes {
  sut: CreateUniqueTarget;
  createTargetDto: CreateUniqueTargetDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTriggerByIdRepository: FindTriggerByIdRepository;
  findTargetByContentRepository: FindTargetByContentRepository;
  createUniqueTargetRepository: CreateUniqueTargetRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findTriggerByIdRepository = new FindTriggerByIdRepositoryMock();
  const findTargetByContentRepository = new FindTargetByContentRepositoryMock();
  const createUniqueTargetRepository = new CreateUniqueTargetRepositoryMock();

  const createTargetDto: CreateUniqueTargetDto = {
    loggedUserId: TargetMock.createdBy,
    content: TargetMock.content,
    triggerId: TargetMock.triggerId,
  };

  const sut = new CreateUniqueTarget(
    findUserByIdRepository,
    findTriggerByIdRepository,
    findTargetByContentRepository,
    createUniqueTargetRepository
  );

  return {
    sut,
    createTargetDto,
    findUserByIdRepository,
    findTriggerByIdRepository,
    findTargetByContentRepository,
    createUniqueTargetRepository,
  };
};

describe('CreateUniqueTarget', () => {
  it('should return Target ID when pass correct CreateUniqueTargetDto object', async () => {
    const { createTargetDto, sut } = makeSut();

    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(TargetMock.id);
  });
  it('should return InsufficientCharacters when pass empty content in CreateUniqueTargetDto object', async () => {
    const { createTargetDto, sut } = makeSut();
    createTargetDto.content = '';
    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return EntityNotEmpty when pass empty loggedUserId in CreateUniqueTargetDto object', async () => {
    const { createTargetDto, sut } = makeSut();
    createTargetDto.loggedUserId = '';
    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty triggerId in CreateUniqueTargetDto object', async () => {
    const { createTargetDto, sut } = makeSut();
    createTargetDto.triggerId = '';
    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when trigger not exists in system', async () => {
    const { createTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as TriggerResponseDto);
    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when target content exists in system', async () => {
    const { createTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findTargetByContentRepository'], 'find')
      .mockResolvedValueOnce(TargetMock);
    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createTargetDto object', async () => {
    const { createTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when return empty target ID from createUniqueTargetRepository', async () => {
    const { createTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['createUniqueTargetRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
