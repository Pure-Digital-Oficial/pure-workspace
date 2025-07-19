import {
  ChangeShotModelInShotDto,
  ShotModelResponseDto,
  UserResponseDto,
} from '@/dtos';
import {
  EntityNotEdited,
  EntityNotExists,
  EntityNotEmpty,
  EntityIsInvalid,
} from '@/errors';
import {
  FindUserByIdRepository,
  FindUserInShotRepository,
  FindShotModelByIdRepository,
  ChangeShotModelInShotRepository,
} from '@/repositories';
import { ShotMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  FindUserInShotRepositoryMock,
  FindShotModelByIdRepositoryMock,
  ChangeShotModelInShotRepositoryMock,
} from '@/test/repositories';
import { ChangeShotModelInShot } from '@/use-cases';

interface SutTypes {
  sut: ChangeShotModelInShot;
  changeShotModelInShotDto: ChangeShotModelInShotDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInShotRepository: FindUserInShotRepository;
  findShotModelByIdRepository: FindShotModelByIdRepository;
  changeShotModelInShotRepository: ChangeShotModelInShotRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInShotRepository = new FindUserInShotRepositoryMock();
  const findShotModelByIdRepository = new FindShotModelByIdRepositoryMock();
  const changeShotModelInShotRepository =
    new ChangeShotModelInShotRepositoryMock();

  const changeShotModelInShotDto: ChangeShotModelInShotDto = {
    modelId: ShotMock.modelId,
    loggedUserId: UserMock.id,
    shotId: ShotMock.id,
  };

  const sut = new ChangeShotModelInShot(
    findUserByIdRepository,
    findUserInShotRepository,
    findShotModelByIdRepository,
    changeShotModelInShotRepository
  );

  return {
    findUserByIdRepository,
    findUserInShotRepository,
    findShotModelByIdRepository,
    changeShotModelInShotRepository,
    changeShotModelInShotDto,
    sut,
  };
};

describe('ChangeShotModelInShot', () => {
  it('should return shot ID when pass correct object in changeShotModelInShotDto', async () => {
    const { changeShotModelInShotDto, sut } = makeSut();

    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBe(ShotMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in changeShotModelInShotDto', async () => {
    const { sut, changeShotModelInShotDto } = makeSut();
    changeShotModelInShotDto.loggedUserId = '';

    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty ID in changeShotModelInShotDto object', async () => {
    const { changeShotModelInShotDto, sut } = makeSut();
    changeShotModelInShotDto.shotId = '';
    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty model ID in changeShotModelInShotDto object', async () => {
    const { changeShotModelInShotDto, sut } = makeSut();
    changeShotModelInShotDto.modelId = '';
    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect user ID in changeShotModelInShotDto', async () => {
    const { changeShotModelInShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when a pass incorrect User or ID or id in changeShotModelInShotDto', async () => {
    const { changeShotModelInShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotExists when shot model ID not exists in system', async () => {
    const { changeShotModelInShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotModelByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ShotModelResponseDto);
    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not changed shot model in system', async () => {
    const { changeShotModelInShotDto, sut } = makeSut();
    jest
      .spyOn(sut['changeShotModelInShotRepository'], 'change')
      .mockResolvedValueOnce('');
    const result = await sut.execute(changeShotModelInShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
