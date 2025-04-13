import { Request } from 'express';
import { ExtractTokenFromHeader } from '@/utils';
import { TokenMock } from '@/test/entities';

const makeSut = (request: Request) => {
  const sut = ExtractTokenFromHeader(request);

  return {
    sut,
  };
};

describe('ExtractTokenFromHeader', () => {
  it('Should return Access Token when pass correct authorization in request', () => {
    const mockRequest = {
      headers: {
        authorization: `Bearer ${TokenMock.accessToken}`,
      },
    } as Request;

    const { sut } = makeSut(mockRequest);

    expect(sut).toStrictEqual(TokenMock.accessToken);
  });

  it('Should return Undefined when pass incorrect authorization in request', () => {
    const mockRequest = {
      headers: {
        authorization: '',
      },
    } as Request;

    const { sut } = makeSut(mockRequest);

    expect(sut).toBeUndefined();
  });
});
