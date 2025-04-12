import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { pureGeneralApi } from '.';
import {
  HttpClientResponse,
  SessionResponseDto,
  TokenResponseDto,
} from '@pure-workspace/domain';
import { tokenService } from '../auth';

interface options {
  refresh?: boolean;
  ctx: GetServerSidePropsContext | null;
}

export async function HttpClient<T = unknown>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  options?: options
): Promise<HttpClientResponse<T>> {
  return await instance
    .request(config)
    .then(async (response) => {
      return {
        data: response.data,
        status: response.status,
      };
    })
    .catch(async (error) => {
      console.log('Passando');
      if (!options?.refresh) return error.response;
      if (error.response.status !== 400) return error.response;

      const currentRefreshToken =
        options?.ctx?.req?.cookies[
          process.env['NEXT_PUBLIC_REFRESH_TOKEN_KEY'] ?? ''
        ];

      return await HttpClient<TokenResponseDto>(pureGeneralApi, {
        method: 'POST',
        url: 'auth/refresh-token',
        headers: {
          Cookie: `refreshToken=${currentRefreshToken}`,
        },
        withCredentials: true,
      }).then(async (response) => {
        const { accessToken, refreshToken } = response.data;

        if (accessToken && refreshToken) {
          tokenService.save({ accessToken, refreshToken }, options?.ctx);

          const newSession = await HttpClient<SessionResponseDto>(
            pureGeneralApi,
            {
              method: 'GET',
              url: 'auth/session',
              params: {
                appId: '1',
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          return {
            data: newSession.data,
            status: newSession.status,
          };
        }
      });
    });
}
