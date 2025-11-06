import { ListFixedGainsDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListFixedGainsRepository,
} from '@/repositories';
import { ListFixedGainsMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListFixedGainsRepositoryMock,
} from '@/test/repositories';
import { ListFixedGains } from '@/use-cases';

interface SutType {
  sut: ListFixedGains;
  listFixedGainsDto: ListFixedGainsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listFixedGainsRepository: ListFixedGainsRepository;
}

const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listFixedGainsRepository = new ListFixedGainsRepositoryMock();

  const listFixedGainsDto: ListFixedGainsDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListFixedGains(
    findUserByIdRepository,
    listFixedGainsRepository
  );

  return {
    sut,
    listFixedGainsDto,
    findUserByIdRepository,
    listFixedGainsRepository,
  };
};

describe('ListFixedGains', () => {
  it('should return fixed gains list when pass correct listFixedGainsDto object', async () => {
    const { listFixedGainsDto, sut } = makeSut();

    const result = await sut.execute(listFixedGainsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListFixedGainsMock);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listFixedGainsDto object', async () => {
    const { listFixedGainsDto, sut } = makeSut();
    listFixedGainsDto.loggedUserId = '';
    const result = await sut.execute(listFixedGainsDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in listFixedGainsDto object', async () => {
    const { listFixedGainsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listFixedGainsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
