import { TokenDto, UserResponseDto, ValidateTokenResponseDto } from '@/dtos';
import {
  EntityIsInvalid,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '@/errors';
import {
  FindUserByIdRepository,
  GenerateTokenRepository,
  ValidateTokenRepository,
} from '@/repositories';
import { TokenMock, UserMock } from '@/test/entities';
import {
  FindUserByIdRepositoryMock,
  ValidateTokenRepositoryMock,
} from '@/test/repositories';
import { RefreshToken } from '@/use-cases';

interface SutTypes {
  sut: RefreshToken;
  tokenDto: TokenDto;
  findUserByIdRepository: FindUserByIdRepository;
  validateTokenRepository: ValidateTokenRepository;
  generateTokenRespository: GenerateTokenRepository;
}

const makeSut = (): SutTypes => {
  const mockGenerateTokenRepository: GenerateTokenRepository = {
    generate: jest.fn(async () => TokenMock.accessToken),
  };
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const validateTokenRepository = new ValidateTokenRepositoryMock();
  const generateTokenRespository = mockGenerateTokenRepository;

  const tokenDto: TokenDto = {
    token: TokenMock.refreshToken,
    userId: UserMock.id,
  };

  const sut = new RefreshToken(
    findUserByIdRepository,
    validateTokenRepository,
    generateTokenRespository
  );

  return {
    sut,
    tokenDto,
    findUserByIdRepository,
    validateTokenRepository,
    generateTokenRespository,
  };
};

describe('RefreshToken', () => {
  it('Should return AccessToken when pass correct tokeDto object', async () => {
    const { sut, tokenDto } = makeSut();
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce(TokenMock.accessToken);
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce(TokenMock.refreshToken);

    const result = await sut.execute(tokenDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(TokenMock);
  });

  it('Should return EntityNotEmpty when pass empty token in tokeDto object', async () => {
    const { sut, tokenDto } = makeSut();
    tokenDto.token = '';
    const result = await sut.execute(tokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('Should return EntityNotEmpty when pass empty userId in tokeDto object', async () => {
    const { sut, tokenDto } = makeSut();
    tokenDto.userId = '';
    const result = await sut.execute(tokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when return user object from findUserByIdRepository', async () => {
    const { tokenDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserResponseDto);

    const result = await sut.execute(tokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when return empty user ID from validateTokenRepository', async () => {
    const { tokenDto, sut } = makeSut();
    jest
      .spyOn(sut['validateTokenRepository'], 'validate')
      .mockResolvedValueOnce({} as ValidateTokenResponseDto);

    const result = await sut.execute(tokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotCreated when return empty Access Token from generateTokenRespository', async () => {
    const { tokenDto, sut } = makeSut();
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce('');

    const result = await sut.execute(tokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityNotCreated when return empty Refresh Token from generateTokenRespository', async () => {
    const { tokenDto, sut } = makeSut();
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce(TokenMock.accessToken);
    jest
      .spyOn(sut['generateTokenRespository'], 'generate')
      .mockResolvedValueOnce('');

    const result = await sut.execute(tokenDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
