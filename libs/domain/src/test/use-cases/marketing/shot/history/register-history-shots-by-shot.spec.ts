import {
  ListTargetsResponseDto,
  RegisterHistoryShotsByShotDto,
  UserResponseDto,
} from '@/dtos';
import { EntityNotCreated, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindTargetsByShotIdRepository,
  FindUserByIdRepository,
  RegisterHistoryShotRepository,
} from '@/repositories';
import { HistoryShotMock, ShotMock, UserMock } from '@/test/entities';
import {
  FindTargetsByShotIdRepositoryMock,
  FindUserByIdRepositoryMock,
  RegisterHistoryShotRepositoryMock,
} from '@/test/repositories';
import { RegisterHistoryShotsByShot } from '@/use-cases';

export interface SutTypes {
  sut: RegisterHistoryShotsByShot;
  registerHistoryShotsByShotDto: RegisterHistoryShotsByShotDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTargetsByShotIdRepository: FindTargetsByShotIdRepository;
  registerHistoryShotRepository: RegisterHistoryShotRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findTargetsByShotIdRepository = new FindTargetsByShotIdRepositoryMock();
  const registerHistoryShotRepository = new RegisterHistoryShotRepositoryMock();

  const registerHistoryShotsByShotDto: RegisterHistoryShotsByShotDto = {
    loggedUserId: UserMock.id,
    shotId: ShotMock.id,
  };

  const sut = new RegisterHistoryShotsByShot(
    findUserByIdRepository,
    findTargetsByShotIdRepository,
    registerHistoryShotRepository
  );

  return {
    sut,
    findUserByIdRepository,
    findTargetsByShotIdRepository,
    registerHistoryShotRepository,
    registerHistoryShotsByShotDto,
  };
};

describe('RegisterHistoryShotsByShot', () => {
  it('should return history shots list when pass correct object in registerHistoryShotsByShotDto', async () => {
    const { sut, registerHistoryShotsByShotDto } = makeSut();

    const result = await sut.execute(registerHistoryShotsByShotDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual([HistoryShotMock.id]);
  });
  it('should return EntityNotEmpty when pass empty shot ID in registerHistoryShotsByShotDto object', async () => {
    const { registerHistoryShotsByShotDto, sut } = makeSut();
    registerHistoryShotsByShotDto.shotId = '';
    const result = await sut.execute(registerHistoryShotsByShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });
  it('should return EntityNotEmpty when pass empty logged user ID in registerHistoryShotsByShotDto object', async () => {
    const { registerHistoryShotsByShotDto, sut } = makeSut();
    registerHistoryShotsByShotDto.loggedUserId = '';
    const result = await sut.execute(registerHistoryShotsByShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in registerHistoryShotsByShotDto object', async () => {
    const { registerHistoryShotsByShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(registerHistoryShotsByShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in registerHistoryShotsByShotDto object', async () => {
    const { registerHistoryShotsByShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findTargetsByShotIdRepository'], 'find')
      .mockResolvedValueOnce({} as ListTargetsResponseDto);
    const result = await sut.execute(registerHistoryShotsByShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated wheN not created history shot in system', async () => {
    const { registerHistoryShotsByShotDto, sut } = makeSut();
    jest
      .spyOn(sut['registerHistoryShotRepository'], 'register')
      .mockResolvedValueOnce('');
    const result = await sut.execute(registerHistoryShotsByShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
