import { CreateTriggerDto, UserResponseDto } from '@/dtos';
import {
  CreateTriggerRepository,
  FindTriggerByContentRepository,
  FindTriggerByNameRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  CreateTriggerRepositoryMock,
  FindTriggerByContentRepositoryMock,
  FindTriggerByNameRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateTrigger } from '@/use-cases';
import { TriggerMock } from '@/test/entities';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '@/errors';

interface SutTypes {
  sut: CreateTrigger;
  createTriggerDto: CreateTriggerDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTriggerByNameRepository: FindTriggerByNameRepository;
  findTriggerByContentRepository: FindTriggerByContentRepository;
  createTriggerRepository: CreateTriggerRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findTriggerByNameRepository = new FindTriggerByNameRepositoryMock();
  const findTriggerByContentRepository =
    new FindTriggerByContentRepositoryMock();
  const createTriggerRepository = new CreateTriggerRepositoryMock();

  const createTriggerDto: CreateTriggerDto = {
    loggedUserId: TriggerMock.createBy,
    body: {
      name: TriggerMock.name,
      content: TriggerMock.content,
      description: TriggerMock.description,
      type: TriggerMock.type,
    },
  };

  const sut = new CreateTrigger(
    findUserByIdRepository,
    findTriggerByNameRepository,
    findTriggerByContentRepository,
    createTriggerRepository
  );

  return {
    sut,
    createTriggerDto,
    findUserByIdRepository,
    findTriggerByNameRepository,
    findTriggerByContentRepository,
    createTriggerRepository,
  };
};

describe('CreateTrigger', () => {
  it('should return Trigger ID when pass correct CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();

    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(TriggerMock.id);
  });
  it('should return InsufficientCharacters when pass empty name in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.body.name = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return InsufficientCharacters when pass empty content in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.body.content = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return InsufficientCharacters when pass empty description in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.body.description = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return EntityNotEmpty when pass empty loggedUserId in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.loggedUserId = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty type in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.body.type = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when trigger name exists in system', async () => {
    const { createTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByNameRepository'], 'find')
      .mockResolvedValueOnce(TriggerMock);
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityAlreadyExists when trigger content exists in system', async () => {
    const { createTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByContentRepository'], 'find')
      .mockResolvedValueOnce(TriggerMock);
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when pass incorrect loggedId in createTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when return empty trigger ID from createTriggerRepository', async () => {
    const { createTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['createTriggerRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
