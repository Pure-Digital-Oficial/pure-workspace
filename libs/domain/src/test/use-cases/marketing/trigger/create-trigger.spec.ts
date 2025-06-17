import { CreateTriggerDto, UserResponseDto } from '@/dtos';
import {
  CreateTriggerRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  CreateTriggerRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { CreateTrigger } from '@/use-cases';
import { TriggerMock } from '@/test/entities';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '@/errors';

interface SutTypes {
  sut: CreateTrigger;
  createTriggerDto: CreateTriggerDto;
  findUserByIdRepository: FindUserByIdRepository;
  createTriggerRepository: CreateTriggerRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const createTriggerRepository = new CreateTriggerRepositoryMock();

  const createTriggerDto: CreateTriggerDto = {
    name: TriggerMock.name,
    content: TriggerMock.content,
    description: TriggerMock.description,
    loggedId: TriggerMock.createBy,
  };

  const sut = new CreateTrigger(
    findUserByIdRepository,
    createTriggerRepository
  );

  return {
    sut,
    createTriggerDto,
    findUserByIdRepository,
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
    createTriggerDto.name = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return InsufficientCharacters when pass empty content in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.content = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return InsufficientCharacters when pass empty description in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.description = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });
  it('should return EntityNotEmpty when pass empty loggedId in CreateTriggerDto object', async () => {
    const { createTriggerDto, sut } = makeSut();
    createTriggerDto.loggedId = '';
    const result = await sut.execute(createTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
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
