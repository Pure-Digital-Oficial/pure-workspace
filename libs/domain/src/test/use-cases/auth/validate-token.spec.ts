import { TokenDto, UserResponseDto, ValidateTokenResponseDto } from '@/dtos';
import { EntityIsInvalid, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindUserByIdRepository,
  ValidateTokenRepository,
} from '@/repositories';
import { TokenMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ValidateTokenRepositoryMock,
} from '@/test/repositories';
import { ValidateToken } from '@/use-cases';

interface SutTypes {
  sut: ValidateToken;
  validateTokenDto: TokenDto;
  findUserIdRepository: FindUserByIdRepository;
  validateTokenRepository: ValidateTokenRepository;
}

const makeSut = (): SutTypes => {
  const findUserIdRepository = new FindUserByIdRepositoryMock();
  const validateTokenRepository = new ValidateTokenRepositoryMock();

  const validateTokenDto: TokenDto = {
    token: TokenMock.accessToken,
    userId: UserMock.id,
  };

  const sut = new ValidateToken(findUserIdRepository, validateTokenRepository);

  return {
    sut,
    validateTokenDto,
    findUserIdRepository,
    validateTokenRepository,
  };
};

describe('ValidateToken', () => {
  it('Should return true when pass correct validateTokenDto object', async () => {
    const { sut, validateTokenDto } = makeSut();

    const result = await sut.execute(validateTokenDto);

    expect(result.value).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('Should return EntityNotEmpty when pass empty user ID validateTokenDto object', async () => {
    const { sut, validateTokenDto } = makeSut();
    validateTokenDto.userId = '';

    const result = await sut.execute(validateTokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('Should return EntityNotEmpty when pass empty token validateTokenDto object', async () => {
    const { sut, validateTokenDto } = makeSut();
    validateTokenDto.token = '';

    const result = await sut.execute(validateTokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when return user object from findUserByIdRepository', async () => {
    const { validateTokenDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);

    const result = await sut.execute(validateTokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when return empty user ID from validateTokenRepository', async () => {
    const { validateTokenDto, sut } = makeSut();
    jest
      .spyOn(sut['validateTokenRepository'], 'validate')
      .mockResolvedValueOnce({} as ValidateTokenResponseDto);

    const result = await sut.execute(validateTokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityIsInvalid when return invalid user ID from validateTokenRepository', async () => {
    const { validateTokenDto, sut } = makeSut();
    jest
      .spyOn(sut['validateTokenRepository'], 'validate')
      .mockResolvedValueOnce({ email: '', userId: '5' });

    const result = await sut.execute(validateTokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });
});
