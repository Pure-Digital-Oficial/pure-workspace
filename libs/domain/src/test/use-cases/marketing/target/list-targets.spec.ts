import { UserResponseDto, ListTargetsDto, TriggerResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindTriggerByIdRepository,
  FindUserByIdRepository,
  ListTargetsRepository,
} from '@/repositories';
import { UserMock, ListTargetsMock, TriggerMock } from '@/test/entities';
import {
  FindTriggerByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListTargetsRepositoryMock,
} from '@/test/repositories';
import { ListTargets } from '@/use-cases';

interface SutTypes {
  sut: ListTargets;
  listTargetsDto: ListTargetsDto;
  findUserByIdRepository: FindUserByIdRepository;
  findTriggerByIdRepository: FindTriggerByIdRepository;
  listTargetsRepository: ListTargetsRepository;
}

const makeSut = (): SutTypes => {
  const listTargetsRepository = new ListTargetsRepositoryMock();
  const findTriggerByIdRepository = new FindTriggerByIdRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();

  const listTargetsDto: ListTargetsDto = {
    loggedUserId: UserMock.id,
    triggerId: TriggerMock.id,
  };

  const sut = new ListTargets(
    findUserByIdRepository,
    findTriggerByIdRepository,
    listTargetsRepository
  );

  return {
    sut,
    listTargetsDto,
    listTargetsRepository,
    findUserByIdRepository,
    findTriggerByIdRepository,
  };
};

describe('ListTargets', () => {
  it('should return a list of targets when pass correct user inputs in listTargetsDto', async () => {
    const { listTargetsDto, sut } = makeSut();

    const result = await sut.execute(listTargetsDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(ListTargetsMock);
  });

  it('should return EntityNotEmpty when a pass incorrect logged User ID in listTargetsDto', async () => {
    const { listTargetsDto, sut } = makeSut();
    listTargetsDto.loggedUserId = '';
    const result = await sut.execute(listTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass incorrect trigger ID in listTargetsDto', async () => {
    const { listTargetsDto, sut } = makeSut();
    listTargetsDto.triggerId = '';
    const result = await sut.execute(listTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect trigger ID', async () => {
    const { listTargetsDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as TriggerResponseDto);
    const result = await sut.execute(listTargetsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
