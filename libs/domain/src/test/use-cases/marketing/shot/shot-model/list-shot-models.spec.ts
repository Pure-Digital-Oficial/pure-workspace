import { UserResponseDto, ListShotModelsDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ListShotModelsRepository,
} from '@/repositories';
import { UserMock, ListShotModelsMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListShotModelsRepositoryMock,
} from '@/test/repositories';
import { ListShotModels } from '@/use-cases';

interface SutTypes {
  sut: ListShotModels;
  listShotModelsDto: ListShotModelsDto;
  findUserByIdRepository: FindUserByIdRepository;
  listShotModelsRepository: ListShotModelsRepository;
}

const makeSut = (): SutTypes => {
  const listShotModelsRepository = new ListShotModelsRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();

  const listShotModelsDto: ListShotModelsDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListShotModels(
    findUserByIdRepository,
    listShotModelsRepository
  );

  return {
    sut,
    listShotModelsDto,
    findUserByIdRepository,
    listShotModelsRepository,
  };
};

describe('ListShotModels', () => {
  it('should return a list of shot models when pass correct user inputs in listShotModelsDto', async () => {
    const { listShotModelsDto, sut } = makeSut();

    const result = await sut.execute(listShotModelsDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(ListShotModelsMock);
  });

  it('should return EntityNotEmpty when a pass incorrect logged User ID in listShotModelsDto', async () => {
    const { listShotModelsDto, sut } = makeSut();
    listShotModelsDto.loggedUserId = '';
    const result = await sut.execute(listShotModelsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listShotModelsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listShotModelsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
