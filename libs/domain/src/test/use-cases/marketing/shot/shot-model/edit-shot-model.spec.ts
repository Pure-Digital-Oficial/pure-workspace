import { EditShotModelDto, UserResponseDto } from '@/dtos';
import {
  EntityNotEdited,
  EntityNotExists,
  EntityAlreadyExists,
  EntityNotEmpty,
  EntityIsInvalid,
} from '@/errors';
import {
  FindUserByIdRepository,
  EditShotModelRepository,
  FindUserInShotModelRepository,
  FindShotModelByTitleRepository,
  FindShotModelBySubjectRepository,
} from '@/repositories';
import { TargetMock, ShotModelMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  EditShotModelRepositoryMock,
  FindUserInShotModelRepositoryMock,
  FindShotModelByTitleRepositoryMock,
  FindShotModelBySubjectRepositoryMock,
} from '@/test/repositories';
import { EditShotModel } from '@/use-cases';

interface SutTypes {
  sut: EditShotModel;
  editShotModelDto: EditShotModelDto;
  editShotModelRepository: EditShotModelRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findUserInShotModelRepository: FindUserInShotModelRepository;
  findShotModelByTitleRepository: FindShotModelByTitleRepository;
  findShotModelBySubjectRepository: FindShotModelBySubjectRepository;
}

const makeSut = (): SutTypes => {
  const editShotModelRepository = new EditShotModelRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserInShotModelRepository = new FindUserInShotModelRepositoryMock();
  const findShotModelByTitleRepository =
    new FindShotModelByTitleRepositoryMock();
  const findShotModelBySubjectRepository =
    new FindShotModelBySubjectRepositoryMock();

  const editShotModelDto: EditShotModelDto = {
    id: TargetMock.id,
    body: ShotModelMock.body,
    loggedUserId: UserMock.id,
    subject: ShotModelMock.subject,
    title: ShotModelMock.title,
  };

  const sut = new EditShotModel(
    findUserByIdRepository,
    findUserInShotModelRepository,
    findShotModelByTitleRepository,
    findShotModelBySubjectRepository,
    editShotModelRepository
  );

  return {
    editShotModelRepository,
    findUserByIdRepository,
    findUserInShotModelRepository,
    findShotModelByTitleRepository,
    findShotModelBySubjectRepository,
    editShotModelDto,
    sut,
  };
};

describe('EditShotModel', () => {
  it('should return shot model ID when pass correct object in editShotModelDto', async () => {
    const { editShotModelDto, sut } = makeSut();

    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBe(ShotModelMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect title in editShotModelDto', async () => {
    const { sut, editShotModelDto } = makeSut();
    editShotModelDto.title = '';

    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in editShotModelDto', async () => {
    const { sut, editShotModelDto } = makeSut();
    editShotModelDto.loggedUserId = '';

    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect body in editShotModelDto', async () => {
    const { sut, editShotModelDto } = makeSut();
    editShotModelDto.body = '';

    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty ID in editShotModelDto object', async () => {
    const { editShotModelDto, sut } = makeSut();
    editShotModelDto.id = '';
    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty subject in editShotModelDto object', async () => {
    const { editShotModelDto, sut } = makeSut();
    editShotModelDto.subject = '';
    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect user ID in editShotModelDto', async () => {
    const { editShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when a pass incorrect User or ID or id in editShotModelDto', async () => {
    const { editShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserInShotModelRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityAlreadyExists when shot model title exists other in system', async () => {
    const { editShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotModelByTitleRepository'], 'find')
      .mockResolvedValueOnce(ShotModelMock);
    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityAlreadyExists when shot model subject exists other in system', async () => {
    const { editShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['findShotModelBySubjectRepository'], 'find')
      .mockResolvedValueOnce(ShotModelMock);
    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotEdited when not edited shot model in system', async () => {
    const { editShotModelDto, sut } = makeSut();
    jest
      .spyOn(sut['editShotModelRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editShotModelDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
