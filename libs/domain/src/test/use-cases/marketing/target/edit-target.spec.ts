import { EditTargetDto, UserResponseDto, TriggerResponseDto } from '@/dtos';
import {
  EntityNotEdited,
  EntityIsInvalid,
  EntityNotExists,
  InsufficientCharacters,
  EntityAlreadyExists,
  EntityNotEmpty,
} from '@/errors';
import {
  EditTargetRepository,
  FindUserInTargetRepository,
  FindTriggerByIdRepository,
  FindUserByIdRepository,
  FindTargetByContentRepository,
} from '@/repositories';
import { TargetMock, TriggerMock, UserMock } from '@/test/entities';
import {
  EditTargetRepositoryMock,
  FindUserInTargetRepositoryMock,
  FindTriggerByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  FindTargetByContentRepositoryMock,
} from '@/test/repositories';
import { EditTarget } from '@/use-cases';

interface SutTypes {
  sut: EditTarget;
  editTargetDto: EditTargetDto;
  editTargetRepository: EditTargetRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInTargetRepository: FindUserInTargetRepository;
  findTriggerByIdRepository: FindTriggerByIdRepository;
  findTargetByContentRepository: FindTargetByContentRepository;
}

const makeSut = (): SutTypes => {
  const editTargetRepository = new EditTargetRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInTargetRepository = new FindUserInTargetRepositoryMock();
  const findTriggerByIdRepository = new FindTriggerByIdRepositoryMock();
  const findTargetByContentRepository = new FindTargetByContentRepositoryMock();

  const editTargetDto: EditTargetDto = {
    id: TargetMock.id,
    loggedUserId: UserMock.id,
    triggerId: TriggerMock.id,
    content: TargetMock.content,
  };

  const sut = new EditTarget(
    findUserByIdRepository,
    findUserInTargetRepository,
    findTriggerByIdRepository,
    findTargetByContentRepository,
    editTargetRepository
  );

  return {
    editTargetRepository,
    findUserByIdRepository,
    findUserInTargetRepository,
    findTriggerByIdRepository,
    findTargetByContentRepository,
    editTargetDto,
    sut,
  };
};

describe('EditTarget', () => {
  it('should return target ID when pass correct object in editTargetDto', async () => {
    const { editTargetDto, sut } = makeSut();

    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBe(TargetMock.id);
  });

  it('should return InsufficientCharacters when pass incorrect content in editTargetDto', async () => {
    const { sut, editTargetDto } = makeSut();
    editTargetDto.content = '';

    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in editTargetDto', async () => {
    const { sut, editTargetDto } = makeSut();
    editTargetDto.loggedUserId = '';

    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect trigger ID in editTargetDto', async () => {
    const { sut, editTargetDto } = makeSut();
    editTargetDto.triggerId = '';

    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty ID in editTargetDto object', async () => {
    const { editTargetDto, sut } = makeSut();
    editTargetDto.id = '';
    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect user ID in editTargetDto', async () => {
    const { editTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect trigger ID or id in editTargetDto', async () => {
    const { editTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByIdRepository'], 'find')
      .mockResolvedValueOnce({} as TriggerResponseDto);
    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when user or target exists in system', async () => {
    const { editTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTargetRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityAlreadyExists when target content exists other in system', async () => {
    const { editTargetDto, sut } = makeSut();
    jest
      .spyOn(sut['findTargetByContentRepository'], 'find')
      .mockResolvedValueOnce(TargetMock);
    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotEdited when not edited target in system', async () => {
    const { editTargetDto, sut } = makeSut();
    jest.spyOn(sut['editTargetRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editTargetDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
