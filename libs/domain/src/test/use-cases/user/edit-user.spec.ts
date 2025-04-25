import { EditUserDto, UserResponseDto } from '@/dtos';
import { EntityNotEdited, EntityNotEmpty, EntityNotExists } from '@/errors';
import { EditUserRepository, FindUserByIdRepository } from '@/repositories';
import { UserMock } from '@/test/entities';
import {
  EditUserRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { GeneralStatus } from '@/types';
import { EditUser } from '@/use-cases';

interface SutTypes {
  sut: EditUser;
  editUserDto: EditUserDto;
  editUserRepository: EditUserRepository;
  findUserByIdRepository: FindUserByIdRepository;
}

const makeSut = (): SutTypes => {
  const editUserRepository = new EditUserRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();

  const editUserDto: EditUserDto = {
    body: {
      id: UserMock.id,
      name: UserMock.name,
      status: 'ACTIVE',
      nickname: UserMock.nickname,
    },
  };

  const sut = new EditUser(findUserByIdRepository, editUserRepository);

  return {
    editUserRepository,
    findUserByIdRepository,
    editUserDto,
    sut,
  };
};

describe('EditUser', () => {
  it('should return user ID when pass correct object in editUserDto', async () => {
    const { editUserDto, sut } = makeSut();

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBe(UserMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect status in editUserDto', async () => {
    const { sut, editUserDto } = makeSut();
    editUserDto.body.status = '' as GeneralStatus;

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect name in editUserDto', async () => {
    const { sut, editUserDto } = makeSut();
    editUserDto.body.name = '';

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect id in editUserDto', async () => {
    const { sut, editUserDto } = makeSut();
    editUserDto.body.id = '';

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect nickname in editUserDto', async () => {
    const { sut, editUserDto } = makeSut();
    editUserDto.body.nickname = '';

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect user id in editUserDto', async () => {
    const { editUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when not edited user in system', async () => {
    const { editUserDto, sut } = makeSut();
    jest.spyOn(sut['editUserRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
