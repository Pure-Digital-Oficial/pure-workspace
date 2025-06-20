import { UserResponseDto, ListTriggersDto } from '@/dtos';
import { EntityNotEmpty, EntityNotExists } from '@/errors';
import { FindUserByIdRepository, ListTriggersRepository } from '@/repositories';
import { UserMock, ListTriggersMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ListTriggersRepositoryMock,
} from '@/test/repositories';
import { ListTriggers } from '@/use-cases';

interface SutTypes {
  sut: ListTriggers;
  listTriggersDto: ListTriggersDto;
  findUserByIdRepository: FindUserByIdRepository;
  listTriggersRepository: ListTriggersRepository;
}

const makeSut = (): SutTypes => {
  const listTriggersRepository = new ListTriggersRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();

  const listTriggersDto: ListTriggersDto = {
    loggedUserId: UserMock.id,
  };

  const sut = new ListTriggers(findUserByIdRepository, listTriggersRepository);

  return {
    sut,
    listTriggersDto,
    listTriggersRepository,
    findUserByIdRepository,
  };
};

describe('ListTriggers', () => {
  it('should return a list of triggers when pass correct user inputs in listUserDto', async () => {
    const { listTriggersDto, sut } = makeSut();

    const result = await sut.execute(listTriggersDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(ListTriggersMock);
  });

  it('should return EntityNotEmpty when a pass incorrect logged User ID in listTriggersDto', async () => {
    const { listTriggersDto, sut } = makeSut();
    listTriggersDto.loggedUserId = '';
    const result = await sut.execute(listTriggersDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listTriggersDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(listTriggersDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
