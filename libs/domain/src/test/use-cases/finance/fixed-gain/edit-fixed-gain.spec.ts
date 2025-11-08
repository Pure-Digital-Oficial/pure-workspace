import {
  EditFixedGainDto,
  FixedGainResponseDto,
  UserResponseDto,
} from '@/dtos';
import { EditFixedGain } from '@/use-cases';
import {
  EditFixedGainRepository,
  FindFixedGainByNameAndValueRepository,
  FindFixedGainByIdRepository,
  FindUserByIdRepository,
} from '@/repositories';
import {
  EditFixedGainRepositoryMock,
  FindFixedGainByIdRepositoryMock,
  FindFixedGainByNameAndValueRepositoryMock,
  FindUserByIdRepositoryMock,
} from '@/test/repositories';
import { FixedGainMock, UserMock } from '@/test/entities';
import { FixedGainType } from '@/types';
import {
  EntityAlreadyExists,
  EntityNotEdited,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';

interface SutTypes {
  sut: EditFixedGain;
  editFixedGainDto: EditFixedGainDto;
  findUserByIdRepository: FindUserByIdRepository;
  findFixedGainByNameAndValueRepository: FindFixedGainByNameAndValueRepository;
  findFixedGainByIdRepository: FindFixedGainByIdRepository;
  editFixedGainRepository: EditFixedGainRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findFixedGainByNameAndValueRepository =
    new FindFixedGainByNameAndValueRepositoryMock();
  const findFixedGainByIdRepository = new FindFixedGainByIdRepositoryMock();
  const editFixedGainRepository = new EditFixedGainRepositoryMock();

  const editFixedGainDto: EditFixedGainDto = {
    id: FixedGainMock.id,
    dayOfReceipt: FixedGainMock.dayOfReceipt,
    frequency: FixedGainMock.frequency as FixedGainType,
    loggedUserId: UserMock.id,
    name: FixedGainMock.name,
    value: FixedGainMock.value,
  };

  const sut = new EditFixedGain(
    findUserByIdRepository,
    findFixedGainByNameAndValueRepository,
    findFixedGainByIdRepository,
    editFixedGainRepository
  );

  return {
    sut,
    editFixedGainDto,
    findFixedGainByIdRepository,
    findUserByIdRepository,
    findFixedGainByNameAndValueRepository,
    editFixedGainRepository,
  };
};

describe('EditTransaction', () => {
  it('should return fixed gain ID when pass correct editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();

    const result = await sut.execute(editFixedGainDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(FixedGainMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    editFixedGainDto.loggedUserId = '';
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty fixed gains ID in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    editFixedGainDto.id = '';
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass dayOfReceipt equal to 0 in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    editFixedGainDto.dayOfReceipt = 0;
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty frequency in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    editFixedGainDto.frequency = '' as FixedGainType;
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    editFixedGainDto.name = '';
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass value equal to 0 in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    editFixedGainDto.value = 0;
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect logged User ID in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when pass name and value same name and value in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['findFixedGainByNameAndValueRepository'], 'find')
      .mockResolvedValueOnce({
        ...FixedGainMock,
        id: 'any_id',
      });
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when pass incorrect fixed ID in editFixedGainDto object', async () => {
    const { editFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['findFixedGainByIdRepository'], 'find')
      .mockResolvedValueOnce({} as FixedGainResponseDto);
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdited when the fxed gain was not edited in the database', async () => {
    const { editFixedGainDto, sut } = makeSut();
    jest
      .spyOn(sut['editFixedGainRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editFixedGainDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEdited);
  });
});
