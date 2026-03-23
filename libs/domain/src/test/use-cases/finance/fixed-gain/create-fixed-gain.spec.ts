import { CreateFixedGainDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  CreateFixedGainRepository,
  FindFixedGainByNameAndValueRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { FixedGainMock, UserMock } from '@/test/entities';
import {
  CreateFixedGainRepositoryMock,
  FindFixedGainByNameAndValueRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { GeneralFrequencyType } from '@/types';
import { CreateFixedGain } from '@/use-cases';

interface SutTypes {
  sut: CreateFixedGain;
  createFixedGainDto: CreateFixedGainDto;
  findUserByIdRepository: FindUserByIdRepository;
  findFixedGainByNameAndValueRepository: FindFixedGainByNameAndValueRepository;
  createFixedGainRepository: CreateFixedGainRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findFixedGainByNameAndValueRepository =
    new FindFixedGainByNameAndValueRepositoryMock();
  const createFixedGainRepository = new CreateFixedGainRepositoryMock();

  const createFixedGainDto: CreateFixedGainDto = {
    name: FixedGainMock.name,
    dayOfReceipt: FixedGainMock.dayOfReceipt,
    frequency: FixedGainMock.frequency as GeneralFrequencyType,
    loggedUserId: UserMock.id,
    value: FixedGainMock.value,
  };

  const sut = new CreateFixedGain(
    findUserByIdRepository,
    findFixedGainByNameAndValueRepository,
    createFixedGainRepository
  );

  return {
    sut,
    createFixedGainDto,
    findUserByIdRepository,
    createFixedGainRepository,
    findFixedGainByNameAndValueRepository,
  };
};

describe('CreateFixedGain', () => {
  it('should return fixed gain ID when pass correct createFixedGainDto object', async () => {
    const { createFixedGainDto, sut } = makeSut();

    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(FixedGainMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in createFixedGainDto object', async () => {
    const { createFixedGainDto, sut } = makeSut();
    createFixedGainDto.loggedUserId = '';
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in createFixedGainDto object', async () => {
    const { createFixedGainDto, sut } = makeSut();
    createFixedGainDto.name = '';
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty value in createFixedGainDto object', async () => {
    const { createFixedGainDto, sut } = makeSut();
    createFixedGainDto.value = -1;
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect dayOfReceipt in createFixedGainDto object', async () => {
    const { createFixedGainDto, sut } = makeSut();
    createFixedGainDto.dayOfReceipt = -1;
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect frequency in createFixedGainDto object', async () => {
    const { createFixedGainDto, sut } = makeSut();
    createFixedGainDto.frequency = '' as GeneralFrequencyType;
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in createFixedGainDto object', async () => {
    const { createFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass name and value that exist in the system', async () => {
    const { createFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['findFixedGainByNameAndValueRepository'], 'find')
      .mockResolvedValueOnce(FixedGainMock);
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not created fixed gain item in the database', async () => {
    const { createFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['createFixedGainRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
