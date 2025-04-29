import { ChangeUserTypeDto, UserResponseDto } from '@/dtos';
import { EntityNotEdited, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  ChangeUserTypeRepository,
  FindUserByIdRepository,
} from '@/repositories';
import { UserMock } from '@/test/entities';
import {
  ChangeUserTypeRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { ChangeUserType } from '@/use-cases';

interface SutTypes {
  sut: ChangeUserType;
  changeUserTypeDto: ChangeUserTypeDto;
  findUserByIdRepository: FindUserByIdRepository;
  changeUserTypeRepository: ChangeUserTypeRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const changeUserTypeRepository = new ChangeUserTypeRepositoryMock();

  const changeUserTypeDto: ChangeUserTypeDto = {
    type: UserMock.type,
    userId: UserMock.id,
  };

  const sut = new ChangeUserType(
    findUserByIdRepository,
    changeUserTypeRepository
  );

  return {
    sut,
    changeUserTypeDto,
    findUserByIdRepository,
    changeUserTypeRepository,
  };
};

describe('ChangeUserType', () => {
  it('should return user ID when pass correct user object in changeUserTypeDto', async () => {
    const { changeUserTypeDto, sut } = makeSut();

    const result = await sut.execute(changeUserTypeDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(UserMock.id);
  });

  it('should return EntityNotEmpty when pass empty user type in changeUserTypeDto', async () => {
    const { changeUserTypeDto, sut } = makeSut();
    changeUserTypeDto.type = '';
    const result = await sut.execute(changeUserTypeDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty user ID in changeUserTypeDto', async () => {
    const { changeUserTypeDto, sut } = makeSut();
    changeUserTypeDto.userId = '';
    const result = await sut.execute(changeUserTypeDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect ID in deleteUserByIdDto object', async () => {
    const { changeUserTypeDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(changeUserTypeDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when pass incorrect ID in deleteUserByIdDto object', async () => {
    const { changeUserTypeDto, sut } = makeSut();
    jest
      .spyOn(sut['changeUserTypeRepository'], 'change')
      .mockResolvedValueOnce('');
    const result = await sut.execute(changeUserTypeDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
