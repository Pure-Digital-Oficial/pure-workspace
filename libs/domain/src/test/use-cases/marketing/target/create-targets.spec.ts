import { CreateTargetsDto, TriggerResponseDto, UserResponseDto } from '@/dtos';
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
import { CreateTargets } from '@/use-cases';
import { TargetMock } from '@/test/entities';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';

interface SutTypes {
  sut: CreateTargets;
  createTargetsDto: CreateTargetsDto;
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

  const createTargetsDto: CreateTargetsDto = {
    loggedUserId: TargetMock.createdBy,
    contents: [TargetMock.content],
    triggerId: TargetMock.triggerId,
  };

  const sut = new CreateTargets(
    findUserByIdRepository,
    findTriggerByIdRepository,
    findTargetByContentRepository,
    createUniqueTargetRepository
  );

  return {
    sut,
    createTargetsDto,
    findUserByIdRepository,
    findTriggerByIdRepository,
    findTargetByContentRepository,
    createUniqueTargetRepository,
  };
};

describe('CreateTargets', () => {
  it('should return Target IDs when pass correct CreateTargetsDto object', async () => {
    const { createTargetsDto, sut } = makeSut();

    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual([TargetMock.id]);
  });
  it('should return EntityNotEmpty when pass empty contents list in createTargetsDto object', async () => {
    const { createTargetsDto, sut } = makeSut();
    createTargetsDto.contents = [];
    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });
  it('should return EntityNotEmpty when pass empty loggedUserId in createTargetsDto object', async () => {
    const { createTargetsDto, sut } = makeSut();
    createTargetsDto.loggedUserId = '';
    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty triggerId in createTargetsDto object', async () => {
    const { createTargetsDto, sut } = makeSut();
    createTargetsDto.triggerId = '';
    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when trigger not exists in system', async () => {
    const { createTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as TriggerResponseDto);
    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when target content exists in system', async () => {
    const { createTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findTargetByContentRepository'], 'find')
      .mockResolvedValueOnce(TargetMock);
    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createTargetsDto object', async () => {
    const { createTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when return empty target ID from createUniqueTargetRepository', async () => {
    const { createTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['createUniqueTargetRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
