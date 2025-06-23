import { EditTriggerDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEdited,
  EntityIsInvalid,
  EntityNotExists,
  InsufficientCharacters,
  EntityAlreadyExists,
  EntityNotEmpty,
} from '@/errors';
import {
  EditTriggerRepository,
  FindTriggerByContentRepository,
  FindTriggerByNameRepository,
  FindUserByIdRepository,
  FindUserInTriggerRepository,
} from '@/repositories';
import { TriggerMock, UserMock } from '@/test/entities';
import {
  EditTriggerRepositoryMock,
  FindTriggerByContentRepositoryMock,
  FindTriggerByNameRepositoryMock,
  FindUserByIdRepositoryMock,
  FindUserInTriggerRepositoryMock,
} from '@/test/repositories';
import { EditTrigger } from '@/use-cases';

interface SutTypes {
  sut: EditTrigger;
  editTriggerDto: EditTriggerDto;
  editTriggerRepository: EditTriggerRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInTriggerRepository: FindUserInTriggerRepository;
  findTriggerByNameRepository: FindTriggerByNameRepository;
  findTriggerByContentRepository: FindTriggerByContentRepository;
}

const makeSut = (): SutTypes => {
  const editTriggerRepository = new EditTriggerRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInTriggerRepository = new FindUserInTriggerRepositoryMock();
  const findTriggerByNameRepository = new FindTriggerByNameRepositoryMock();
  const findTriggerByContentRepository =
    new FindTriggerByContentRepositoryMock();

  const editTriggerDto: EditTriggerDto = {
    id: TriggerMock.id,
    loggedUserId: UserMock.id,
    body: {
      content: TriggerMock.content,
      description: TriggerMock.description,
      name: TriggerMock.name,
      type: TriggerMock.type,
    },
  };

  const sut = new EditTrigger(
    findUserByIdRepository,
    findUserInTriggerRepository,
    findTriggerByNameRepository,
    findTriggerByContentRepository,
    editTriggerRepository
  );

  return {
    editTriggerRepository,
    findUserByIdRepository,
    findUserInTriggerRepository,
    findTriggerByNameRepository,
    findTriggerByContentRepository,
    editTriggerDto,
    sut,
  };
};

describe('EditTrigger', () => {
  it('should return trigger ID when pass correct object in editTriggerDto', async () => {
    const { editTriggerDto, sut } = makeSut();

    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBe(TriggerMock.id);
  });

  it('should return InsufficientCharacters when pass incorrect name in editTriggerDto', async () => {
    const { sut, editTriggerDto } = makeSut();
    editTriggerDto.body.name = '';

    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when pass incorrect description in editTriggerDto', async () => {
    const { sut, editTriggerDto } = makeSut();
    editTriggerDto.body.description = '';

    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when pass incorrect content in editTriggerDto', async () => {
    const { sut, editTriggerDto } = makeSut();
    editTriggerDto.body.content = '';

    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityNotEmpty when pass empty type in editTriggerDto object', async () => {
    const { editTriggerDto, sut } = makeSut();
    editTriggerDto.body.type = '';
    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect user id in editUserDto', async () => {
    const { editTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when a pass incorrect logged user id or id in editTriggerDto', async () => {
    const { editTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInTriggerRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityAlreadyExists when trigger name exists in system', async () => {
    const { editTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByNameRepository'], 'find')
      .mockResolvedValueOnce(TriggerMock);
    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityAlreadyExists when trigger content exists in system', async () => {
    const { editTriggerDto, sut } = makeSut();
    jest
      .spyOn(sut['findTriggerByContentRepository'], 'find')
      .mockResolvedValueOnce(TriggerMock);
    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotEdited when not edited trigger in system', async () => {
    const { editTriggerDto, sut } = makeSut();
    jest.spyOn(sut['editTriggerRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
