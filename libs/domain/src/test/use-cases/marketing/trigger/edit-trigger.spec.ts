import { EditTriggerDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEdited,
  EntityIsInvalid,
  EntityNotExists,
  InsufficientCharacters,
} from '@/errors';
import {
  EditTriggerRepository,
  FindUserByIdRepository,
  FindUserInTriggerRepository,
} from '@/repositories';
import { TriggerMock, UserMock } from '@/test/entities';
import {
  EditTriggerRepositoryMock,
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
}

const makeSut = (): SutTypes => {
  const editTriggerRepository = new EditTriggerRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInTriggerRepository = new FindUserInTriggerRepositoryMock();

  const editTriggerDto: EditTriggerDto = {
    id: TriggerMock.id,
    content: TriggerMock.content,
    description: TriggerMock.description,
    loggedUserId: UserMock.id,
    name: TriggerMock.name,
  };

  const sut = new EditTrigger(
    findUserByIdRepository,
    findUserInTriggerRepository,
    editTriggerRepository
  );

  return {
    editTriggerRepository,
    findUserByIdRepository,
    findUserInTriggerRepository,
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
    editTriggerDto.name = '';

    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when pass incorrect description in editTriggerDto', async () => {
    const { sut, editTriggerDto } = makeSut();
    editTriggerDto.description = '';

    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when pass incorrect content in editTriggerDto', async () => {
    const { sut, editTriggerDto } = makeSut();
    editTriggerDto.content = '';

    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
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

  it('should return EntityNotEdited when not edited trigger in system', async () => {
    const { editTriggerDto, sut } = makeSut();
    jest.spyOn(sut['editTriggerRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editTriggerDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
