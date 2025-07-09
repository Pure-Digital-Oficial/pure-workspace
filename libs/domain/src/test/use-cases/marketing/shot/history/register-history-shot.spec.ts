import { RegisterHistoryShotDto, UserResponseDto } from '@/dtos';
import {
  EntityIsInvalid,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  RegisterHistoryShotRepository,
  FindUserByIdRepository,
  FindUserInShotRepository,
  FindUserInTargetRepository,
} from '@/repositories';
import { HistoryShotMock, UserMock } from '@/test/entities';
import {
  RegisterHistoryShotRepositoryMock,
  FindUserByIdRepositoryMock,
  FindUserInShotRepositoryMock,
  FindUserInTargetRepositoryMock,
} from '@/test/repositories';
import { RegisterHistoryShot } from '@/use-cases';

interface SutTypes {
  sut: RegisterHistoryShot;
  registerHistoryShotDto: RegisterHistoryShotDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInTargetRepository: FindUserInTargetRepository;
  findUserInShotRepository: FindUserInShotRepository;
  registerHistoryShotRepository: RegisterHistoryShotRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInTargetRepository = new FindUserInTargetRepositoryMock();
  const findUserInShotRepository = new FindUserInShotRepositoryMock();
  const registerHistoryShotRepository = new RegisterHistoryShotRepositoryMock();

  const registerHistoryShotDto: RegisterHistoryShotDto = {
    loggedUserId: UserMock.id,
    targetId: HistoryShotMock.targetId,
    shotId: HistoryShotMock.shotId,
  };

  const sut = new RegisterHistoryShot(
    findUserByIdRepository,
    findUserInTargetRepository,
    findUserInShotRepository,
    registerHistoryShotRepository
  );

  return {
    sut,
    registerHistoryShotDto,
    findUserByIdRepository,
    findUserInTargetRepository,
    findUserInShotRepository,
    registerHistoryShotRepository,
  };
};

describe('RegisterHistoryShot', () => {
  it('should return history shot ID when pass correct registerHistoryShotDto object', async () => {
    const { registerHistoryShotDto, sut } = makeSut();

    const result = await sut.execute(registerHistoryShotDto);

    expect(result.value).toStrictEqual(HistoryShotMock.id);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('should return EntityNotEmpty when pass empty shot ID in registerHistoryShotDto object', async () => {
    const { registerHistoryShotDto, sut } = makeSut();
    registerHistoryShotDto.shotId = '';
    const result = await sut.execute(registerHistoryShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty target ID in registerHistoryShotDto object', async () => {
    const { registerHistoryShotDto, sut } = makeSut();
    registerHistoryShotDto.targetId = '';
    const result = await sut.execute(registerHistoryShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in registerHistoryShotDto object', async () => {
    const { registerHistoryShotDto, sut } = makeSut();
    registerHistoryShotDto.loggedUserId = '';
    const result = await sut.execute(registerHistoryShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in registerHistoryShotDto object', async () => {
    const { registerHistoryShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(registerHistoryShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect target ID in registerHistoryShotDto object', async () => {
    const { registerHistoryShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTargetRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(registerHistoryShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityIsInvalid when pass incorrect shot ID in registerHistoryShotDto object', async () => {
    const { registerHistoryShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(registerHistoryShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotCreated when not registered history shot in system', async () => {
    const { registerHistoryShotDto, sut } = makeSut();
    jest
      .spyOn(sut['registerHistoryShotRepository'], 'register')
      .mockResolvedValueOnce('');
    const result = await sut.execute(registerHistoryShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
