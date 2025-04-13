import { GetServerSidePropsContext } from 'next';
import { SessionResponseDto, TokenResponseDto } from '@pure-workspace/domain';
import { entityNotFoundMessage, entityFailureMessage } from '../../../utils';
import { HttpClient, pureGeneralApi } from '../axios-config';
import { tokenService } from './token.service';

interface TokenRefreshServiceProps {
  tokenKey: string;
  appId: string;
  ctx: GetServerSidePropsContext | null;
}

export async function tokenRefreshService<T>({
  tokenKey,
  appId,
  ctx,
}: TokenRefreshServiceProps) {
  const currentRefreshToken = ctx?.req?.cookies?.[tokenKey];

  if (!currentRefreshToken) {
    throw new Error(entityNotFoundMessage('Refresh token', 'PT-BR'));
  }

  const refreshResponse = await HttpClient<TokenResponseDto>(pureGeneralApi, {
    method: 'POST',
    url: 'auth/refresh-token',
    headers: {
      Cookie: `refreshToken=${currentRefreshToken}`,
    },
    withCredentials: true,
  });

  const { accessToken, refreshToken } = refreshResponse.data;

  if (!accessToken || !refreshToken) {
    throw new Error(entityFailureMessage('renovar tokens', 'PT-BR'));
  }

  tokenService.save({ accessToken, refreshToken }, ctx);

  const sessionResponse = await HttpClient<SessionResponseDto>(pureGeneralApi, {
    method: 'GET',
    url: 'auth/session',
    params: {
      appId: appId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    data: sessionResponse.data as unknown as T,
    status: sessionResponse.status,
  };
}
