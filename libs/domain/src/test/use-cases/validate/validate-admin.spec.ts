import { UserResponseDto } from '@/dtos';
import { EntityNotAccess, EntityNotExists } from '@/errors';
import { FindUserByIdRepository } from '@/repositories';
import { UserMock } from '@/test/entities';
import { FindUserByIdRepositoryMock } from '@/test/repositories';
import { ValidateAdmin } from '@/use-cases';

interface SutTypes {
  sut: ValidateAdmin;
  findUserByIdRepository: FindUserByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();

  const sut = new ValidateAdmin(findUserByIdRepository);

  return {
    sut,
    findUserByIdRepository,
  };
};

describe('ValidateAdmin', () => {
  it('Should return true when user is an admin', async () => {
    const { sut } = makeSut();
    jest.spyOn(sut['findUserByIdRepository'], 'find').mockResolvedValueOnce({
      ...UserMock,
      type: 'ADMIN',
    });

    const result = await sut.execute(UserMock.id);

    expect(result.value).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('Should return EntityNotExists when user does not exist', async () => {
    const { sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);

    const result = await sut.execute(UserMock.id);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('Should return EntityNotAccess when user is not an admin', async () => {
    const { sut } = makeSut();
    jest.spyOn(sut['findUserByIdRepository'], 'find').mockResolvedValueOnce({
      ...UserMock,
      type: 'DEFAULT',
    });

    const result = await sut.execute(UserMock.id);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotAccess);
  });
});
