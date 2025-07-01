import {
  TriggerResponseDto,
  UserResponseDto,
  ChangeTargetsTriggerDto,
} from '@/dtos';
import {
  ChangeTargetTriggerRepository,
  FindUserInTargetRepository,
  FindTriggerByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  ChangeTargetTriggerRepositoryMock,
  FindTriggerByIdRepositoryMock,
  FindUserInTargetRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { ChangeTargetsTrigger } from '@/use-cases';
import { TargetMock } from '@/test/entities';
import {
  EntityIsInvalid,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';

interface SutTypes {
  sut: ChangeTargetsTrigger;
  changeTargetTriggerDto: ChangeTargetsTriggerDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTriggerByIdRepository: FindTriggerByIdRepository;
  findUserInTargetRepository: FindUserInTargetRepository;
  changeTargetTriggerRepository: ChangeTargetTriggerRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findTriggerByIdRepository = new FindTriggerByIdRepositoryMock();
  const findUserInTargetRepository = new FindUserInTargetRepositoryMock();
  const changeTargetTriggerRepository = new ChangeTargetTriggerRepositoryMock();

  const changeTargetTriggerDto: ChangeTargetsTriggerDto = {
    loggedUserId: TargetMock.createdBy,
    triggerId: TargetMock.triggerId,
    targetsIds: [TargetMock.id],
  };

  const sut = new ChangeTargetsTrigger(
    findUserByIdRepository,
    findTriggerByIdRepository,
    findUserInTargetRepository,
    changeTargetTriggerRepository
  );

  return {
    sut,
    changeTargetTriggerDto,
    findUserByIdRepository,
    findTriggerByIdRepository,
    findUserInTargetRepository,
    changeTargetTriggerRepository,
  };
};

describe('ChangeTargetTrigger', () => {
  it('should return Target IDs when pass correct changeTargetTriggerDto object', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();

    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual([TargetMock.id]);
  });
  it('should return EntityNotEmpty when pass empty logged User ID in changeTargetTriggerDto object', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();
    changeTargetTriggerDto.loggedUserId = '';
    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty trigger ID in changeTargetTriggerDto object', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();
    changeTargetTriggerDto.triggerId = '';
    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty targets IDs list in changeTargetTriggerDto object', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();
    changeTargetTriggerDto.targetsIds = [];
    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when trigger not exists in system', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as TriggerResponseDto);
    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when target or user ID exists in system', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTargetRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in changeTargetTriggerDto object', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when return empty targets IDs from changeTargetTriggerRepository', async () => {
    const { changeTargetTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['changeTargetTriggerRepository'], 'change')
      .mockResolvedValueOnce('');

    const result = await sut.execute(changeTargetTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
