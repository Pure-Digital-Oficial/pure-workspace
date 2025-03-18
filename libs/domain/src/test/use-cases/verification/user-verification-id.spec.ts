import { UserVerificationId } from '@/utils';
import { FindUserByIdRepository } from '@/repositories';
import { FindUserByIdRepositoryMock } from '@/test/repositories';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import { UserResponseDto } from '@/dtos';

const makeSut = (id: string, repository: FindUserByIdRepository) => {
  const sut = UserVerificationId(id, repository);

  return {
    sut,
  };
};

describe('UserVerificationId', () => {
  it('Should return undefined when exist user id in database', async () => {
    const { sut } = makeSut('any_id', new FindUserByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(false);
    expect(result?.isRight()).toBe(true);
    expect(result?.value).toStrictEqual(undefined);
  });

  it('Should return EntityNotEmpty when no pass incorrect user id', async () => {
    const { sut } = makeSut('', new FindUserByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('Should return EntityNotExists when no pass incorrect user id', async () => {
    const mockEmptyItem = {} as UserResponseDto;

    const mockEmptyRepository: FindUserByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };

    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotExists);
  });
});
