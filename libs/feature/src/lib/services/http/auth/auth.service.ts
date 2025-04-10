import { HttpClient, pureGeneralApi } from '../axios-config';
import {
  AuthDto,
  TokenResponseDto,
  HttpClientResponse,
  SessionResponseDto,
} from '@pure-workspace/domain';
import { tokenService } from './token.service';
import { GetServerSidePropsContext } from 'next';

export const authService = {
  async login(authDto: AuthDto) {
    return HttpClient<Omit<TokenResponseDto, 'refreshToken'>>(pureGeneralApi, {
      method: 'POST',
      url: 'auth/login',
      data: {
        email: authDto.email,
        password: authDto.password,
      },
      params: {
        appId: authDto.appId,
      },
    }).then(
      (result: HttpClientResponse<Omit<TokenResponseDto, 'refreshToken'>>) => {
        tokenService.save(result.data.accessToken);
      }
    );
  },
  async getSession(ctx: GetServerSidePropsContext, appId: string) {
    const token = tokenService.get(ctx);
    const response = await HttpClient<SessionResponseDto>(
      pureGeneralApi,
      {
        method: 'GET',
        url: 'auth/session',
        params: {
          appId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      true
    );

    if (response.status !== 200) {
      throw new Error('Não autorizado');
    }

    return response.data;
  },
};
