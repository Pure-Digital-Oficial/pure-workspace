import { EditShotDto, ShotModelResponseDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEdited,
  EntityNotExists,
  EntityAlreadyExists,
  EntityNotEmpty,
  EntityIsInvalid,
} from '@/errors';
import {
  FindUserByIdRepository,
  EditShotRepository,
  FindUserInShotRepository,
  FindShotByTitleRepository,
  FindShotModelByIdRepository,
} from '@/repositories';
import { TargetMock, ShotMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  EditShotRepositoryMock,
  FindUserInShotRepositoryMock,
  FindShotByTitleRepositoryMock,
  FindShotModelByIdRepositoryMock,
} from '@/test/repositories';
import { EditShot } from '@/use-cases';

interface SutTypes {
  sut: EditShot;
  editShotDto: EditShotDto;
  editShotRepository: EditShotRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInShotRepository: FindUserInShotRepository;
  findShotByTitleRepository: FindShotByTitleRepository;
  findShotModelByIdRepository: FindShotModelByIdRepository;
}

const makeSut = (): SutTypes => {
  const editShotRepository = new EditShotRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInShotRepository = new FindUserInShotRepositoryMock();
  const findShotByTitleRepository = new FindShotByTitleRepositoryMock();
  const findShotModelByIdRepository = new FindShotModelByIdRepositoryMock();

  const editShotDto: EditShotDto = {
    id: TargetMock.id,
    loggedUserId: UserMock.id,
    title: ShotMock.title,
    modelId: ShotMock.modelId,
  };

  const sut = new EditShot(
    findUserByIdRepository,
    findUserInShotRepository,
    findShotByTitleRepository,
    findShotModelByIdRepository,
    editShotRepository
  );

  return {
    editShotRepository,
    findUserByIdRepository,
    findUserInShotRepository,
    findShotByTitleRepository,
    findShotModelByIdRepository,
    editShotDto,
    sut,
  };
};

describe('EditShot', () => {
  it('should return shot ID when pass correct object in editShotDto', async () => {
    const { editShotDto, sut } = makeSut();

    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBe(ShotMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect title in editShotDto', async () => {
    const { sut, editShotDto } = makeSut();
    editShotDto.title = '';

    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in editShotDto', async () => {
    const { sut, editShotDto } = makeSut();
    editShotDto.loggedUserId = '';

    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty ID in editShotDto object', async () => {
    const { editShotDto, sut } = makeSut();
    editShotDto.id = '';
    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty model ID in editShotDto object', async () => {
    const { editShotDto, sut } = makeSut();
    editShotDto.modelId = '';
    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect user ID in editShotDto', async () => {
    const { editShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when a pass incorrect User or ID or id in editShotDto', async () => {
    const { editShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityAlreadyExists when shot  title exists other in system', async () => {
    const { editShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotByTitleRepository'], 'find')
      .mockResolvedValueOnce(ShotMock);
    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when shot model ID not exists in system', async () => {
    const { editShotDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotModelByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ShotModelResponseDto);
    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not edited shot  in system', async () => {
    const { editShotDto, sut } = makeSut();
    jest.spyOn(sut['editShotRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editShotDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
