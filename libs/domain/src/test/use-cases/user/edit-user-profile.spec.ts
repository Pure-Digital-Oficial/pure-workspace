import { EditUserProfileDto, UserResponseDto } from '@/dtos';
import {
  EntityAlreadyExists,
  EntityIsInvalid,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  EditUserProfileRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { AuthMock, UserMock } from '@/test/entities';
import {
  EditUserProfileRepositoryMock,
  FindUserByEmailRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { EditUserProfile } from '@/use-cases';

interface SutTypes {
  sut: EditUserProfile;
  editUserProfileDto: EditUserProfileDto;
  findUserByIdRepository: FindUserByIdRepository;
  findUserByEmailRepository: FindUserByEmailRepository;
  editUserProfileRepository: EditUserProfileRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findUserByEmailRepository = new FindUserByEmailRepositoryMock();
  const editUserProfileRepository = new EditUserProfileRepositoryMock();

  const editUserProfileDto: EditUserProfileDto = {
    id: UserMock.id,
    email: AuthMock.email,
    loggedUserId: UserMock.id,
    name: UserMock.name,
  };

  const sut = new EditUserProfile(
    findUserByIdRepository,
    findUserByEmailRepository,
    editUserProfileRepository
  );

  return {
    sut,
    editUserProfileDto,
    findUserByIdRepository,
    findUserByEmailRepository,
    editUserProfileRepository,
  };
};

describe('EditUserProfile', () => {
  it('should return User ID when pass correct user object in editUserProfileDto', async () => {
    const { editUserProfileDto, sut } = makeSut();

    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(UserMock.id);
  });

  it('should return EntityNotEmpty when pass empty email in editUserProfileDto', async () => {
    const { editUserProfileDto, sut } = makeSut();
    editUserProfileDto.email = '';
    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty user ID in editUserProfileDto', async () => {
    const { editUserProfileDto, sut } = makeSut();
    editUserProfileDto.id = '';
    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty logged user ID in editUserProfileDto', async () => {
    const { editUserProfileDto, sut } = makeSut();
    editUserProfileDto.loggedUserId = '';
    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty user name in editUserProfileDto', async () => {
    const { editUserProfileDto, sut } = makeSut();
    editUserProfileDto.name = '';
    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in editUserProfileDto object', async () => {
    const { editUserProfileDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when pass incorrect user id in editUserProfileDto', async () => {
    const { editUserProfileDto, sut } = makeSut();
    editUserProfileDto.id = 'aa';
    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityAlreadyExists when return other user id in from findUserByEmailRepository', async () => {
    const { editUserProfileDto, sut } = makeSut();
    jest.spyOn(sut['findUserByEmailRepository'], 'find').mockResolvedValueOnce({
      ...UserMock,
      id: 'any_id',
    });

    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotEdited when a not edited user', async () => {
    const { editUserProfileDto, sut } = makeSut();
    jest
      .spyOn(sut['editUserProfileRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editUserProfileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
