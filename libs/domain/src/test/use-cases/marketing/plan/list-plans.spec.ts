import { ListPlansDto, UserResponseDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import { FindUserByIdRepository, ListPlansRepository } from '@/repositories';
import { ListPlansMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListPlansRepositoryMock,
} from '@/test/repositories';
import { ListPlans } from '@/use-cases';

interface SutTypes {
  sut: ListPlans;
  listPlansDto: ListPlansDto;
  findUserByIdRepository: FindUserByIdRepository;
  listPlansRepository: ListPlansRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listPlansRepository = new ListPlansRepositoryMock();

  const listPlansDto: ListPlansDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListPlans(findUserByIdRepository, listPlansRepository);

  return {
    sut,
    listPlansDto,
    findUserByIdRepository,
    listPlansRepository,
  };
};

describe('ListPlans', () => {
  it('should return List Plans when pass correct ListPlansDto object', async () => {
    const { listPlansDto, sut } = makeSut();

    const result = await sut.execute(listPlansDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListPlansMock);
  });

  it('should return EntityNotEmpty when pass incorrect logged Use ID in ListPlansDto', async () => {
    const { sut, listPlansDto } = makeSut();
    listPlansDto.loggedUserId = '';

    const result = await sut.execute(listPlansDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in ListPlansDto object', async () => {
    const { listPlansDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listPlansDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
