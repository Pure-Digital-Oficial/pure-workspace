import {
  AppResponseDto,
  GetSessionDto,
  SessionResponseDto,
  ValidateTokenResponseDto,
} from '@/dtos';
import { EntityIsInvalid, EntityNotEmpty, EntityNotExists } from '@/errors';
import {
  FindAppByIdRepository,
  GetSessionRepository,
  ValidateTokenRepository,
} from '@/repositories';
import { AppMock, SessionMock, TokenMock } from '@/test/entities';
import {
  FindAppByIdRepositoryMock,
  GetSessionRepositoryMock,
  ValidateTokenRepositoryMock,
} from '@/test/repositories';
import { GetSession } from '@/use-cases';

interface SutTypes {
  sut: GetSession;
  getSessionDto: GetSessionDto;
  findAppByIdRepository: FindAppByIdRepository;
  validateTokenRepository: ValidateTokenRepository;
  getSessionRepository: GetSessionRepository;
}

const makeSut = (): SutTypes => {
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const validateTokenRepository = new ValidateTokenRepositoryMock();
  const getSessionRepository = new GetSessionRepositoryMock();

  const getSessionDto: GetSessionDto = {
    accessToken: TokenMock.accessToken,
    appId: AppMock.id,
  };

  const sut = new GetSession(
    findAppByIdRepository,
    validateTokenRepository,
    getSessionRepository
  );

  return {
    sut,
    getSessionDto,
    getSessionRepository,
    findAppByIdRepository,
    validateTokenRepository,
  };
};

describe('GetSession', () => {
  it('Should return session response dto when pass correct get session dto object', async () => {
    const { sut, getSessionDto } = makeSut();

    const result = await sut.execute(getSessionDto);

    expect(result.value).toStrictEqual(SessionMock);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('Should return EntityNotEmpty when pass empty app ID in get session dto object', async () => {
    const { sut, getSessionDto } = makeSut();
    getSessionDto.appId = '';
    const result = await sut.execute(getSessionDto);

    expect(result.value).toBeInstanceOf(EntityNotEmpty);
    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
  });

  it('Should return EntityNotEmpty when pass empty access token in get session dto object', async () => {
    const { sut, getSessionDto } = makeSut();
    getSessionDto.accessToken = '';
    const result = await sut.execute(getSessionDto);

    expect(result.value).toBeInstanceOf(EntityNotEmpty);
    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
  });

  it('should return EntityNotExists when return empty app object from findAppByIdRepository', async () => {
    const { getSessionDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as AppResponseDto);

    const result = await sut.execute(getSessionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsInvalid when return empty validate token object from validateTokenRepository', async () => {
    const { getSessionDto, sut } = makeSut();
    jest
      .spyOn(sut['validateTokenRepository'], 'validate')
      .mockResolvedValueOnce({} as ValidateTokenResponseDto);

    const result = await sut.execute(getSessionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityIsInvalid);
  });

  it('should return EntityNotExists when return empty sessopm response object from getSessionRepository', async () => {
    const { getSessionDto, sut } = makeSut();
    jest
      .spyOn(sut['getSessionRepository'], 'get')
      .mockResolvedValueOnce({} as SessionResponseDto);

    const result = await sut.execute(getSessionDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
