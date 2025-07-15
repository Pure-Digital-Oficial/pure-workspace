import { RegisterHistoryShotsDto, UserResponseDto } from '@/dtos';
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
import { RegisterHistoryShots } from '@/use-cases';

interface SutTypes {
  sut: RegisterHistoryShots;
  registerHistoryShotsDto: RegisterHistoryShotsDto;
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

  const registerHistoryShotsDto: RegisterHistoryShotsDto = {
    loggedUserId: UserMock.id,
    targetIds: [HistoryShotMock.targetId],
    shotId: HistoryShotMock.shotId,
  };

  const sut = new RegisterHistoryShots(
    findUserByIdRepository,
    findUserInTargetRepository,
    findUserInShotRepository,
    registerHistoryShotRepository
  );

  return {
    sut,
    registerHistoryShotsDto,
    findUserByIdRepository,
    findUserInTargetRepository,
    findUserInShotRepository,
    registerHistoryShotRepository,
  };
};

describe('RegisterHistoryShots', () => {
  it('should return history shot ID when pass correct registerHistoryShotsDto object', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();

    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.value).toStrictEqual([HistoryShotMock.id]);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('should return EntityNotEmpty when pass empty shot ID in registerHistoryShotsDto object', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();
    registerHistoryShotsDto.shotId = '';
    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty target ID in registerHistoryShotsDto object', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();
    registerHistoryShotsDto.targetIds = [];
    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in registerHistoryShotsDto object', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();
    registerHistoryShotsDto.loggedUserId = '';
    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in registerHistoryShotsDto object', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect target ID in registerHistoryShotsDto object', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTargetRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityIsInvalid when pass incorrect shot ID in registerHistoryShotsDto object', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotCreated when not registered history shot in system', async () => {
    const { registerHistoryShotsDto, sut } = makeSut();
    jest
      .spyOn(sut['registerHistoryShotRepository'], 'register')
      .mockResolvedValueOnce('');
    const result = await sut.execute(registerHistoryShotsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
