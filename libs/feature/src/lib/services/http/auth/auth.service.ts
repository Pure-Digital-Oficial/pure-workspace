import { HttpClient, pureGeneralApi } from '../axios-config';
import {
  AuthDto,
  TokenResponseDto,
  HttpClientResponse,
} from '@pure-workspace/domain';
import { tokenService } from './token.service';

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
};
