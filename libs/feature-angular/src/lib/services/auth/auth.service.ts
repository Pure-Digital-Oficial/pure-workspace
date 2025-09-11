import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponseDto } from '@pure-workspace/domain';
import { SessionStorageService } from '../utils';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageService = inject(SessionStorageService);
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  apiUrl = environment.apiUrl;

  login(email: string, password: string) {
    return this.httpClient
      .post<TokenResponseDto>(this.apiUrl + '/login', { email, password })
      .pipe(
        tap((value) => {
          this.storageService.setAuthTokens({
            accessToken: value.accessToken,
            refreshToken: value.refreshToken,
          });
          this.router.navigate(['/']);
        })
      );
  }

  refresh(refreshToken: string) {
    return this.httpClient
      .post<TokenResponseDto>(this.apiUrl + '/refresh-token', { refreshToken })
      .pipe(
        tap((value) => {
          this.storageService.setAuthTokens({
            accessToken: value.accessToken,
            refreshToken: value.refreshToken,
          });
          this.router.navigate(['/']);
        })
      );
  }
}
