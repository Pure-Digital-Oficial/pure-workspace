import { inject, Injectable } from '@angular/core';
import { TokenResponseDto } from '@pure-workspace/domain';
import { environment } from '../../environments';
import { CookieStorageService } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private storageService = inject(CookieStorageService);
  setAuthTokens(input: TokenResponseDto) {
    this.storageService.setCookie({
      name: environment.accessTokenKey,
      value: input.accessToken,
      minutes: 2,
    });

    this.storageService.setCookie({
      name: environment.refreshTokenKey,
      value: input.refreshToken,
      days: 7,
    });
  }

  getToken() {
    return this.storageService.getCookie(environment.accessTokenKey);
  }

  getRefreshToken() {
    return this.storageService.getCookie(environment.refreshTokenKey);
  }

  removeAuthTokens() {
    this.storageService.deleteCookies([
      {
        name: environment.accessTokenKey,
      },
      {
        name: environment.refreshTokenKey,
      },
    ]);
  }
}
