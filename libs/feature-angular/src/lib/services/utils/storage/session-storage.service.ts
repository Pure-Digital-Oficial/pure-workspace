import { Injectable } from '@angular/core';
import { TokenResponseDto } from '@pure-workspace/domain';
import { environment } from '../../../environments';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setAuthTokens(input: TokenResponseDto) {
    sessionStorage.setItem(environment.accessTokenKey, input.accessToken);
    sessionStorage.setItem(environment.refreshTokenKey, input.refreshToken);
  }

  getToken() {
    return sessionStorage.getItem(environment.accessTokenKey);
  }

  getRefreshToken() {
    return sessionStorage.getItem(environment.refreshTokenKey);
  }
}
