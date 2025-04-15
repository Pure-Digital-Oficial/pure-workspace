import { AppVerificationId } from '@/utils';
import { FindAppByIdRepository } from '@/repositories';
import { FindAppByIdRepositoryMock } from '@/test/repositories';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import { AppResponseDto } from '@/dtos';

const makeSut = (id: string, repository: FindAppByIdRepository) => {
  const sut = AppVerificationId(id, repository);

  return {
    sut,
  };
};

describe('AppVerificationId', () => {
  it('Should return undefined when exist app id in database', async () => {
    const { sut } = makeSut('any_id', new FindAppByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(false);
    expect(result?.isRight()).toBe(true);
    expect(result?.value).toStrictEqual(undefined);
  });

  it('Should return EntityNotEmpty when no pass incorrect app id', async () => {
    const { sut } = makeSut('', new FindAppByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('Should return EntityNotExists when no pass incorrect app id', async () => {
    const mockEmptyItem = {} as AppResponseDto;

    const mockEmptyRepository: FindAppByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };

    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotExists);
  });
});
