import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { TokenResponseDto } from '@pure-workspace/domain';
import { environment } from '../../environments';
import { TokenService, SessionService } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenService = inject(TokenService);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private session = inject(SessionService);

  apiUrl = environment.apiUrl;

  login(email: string, password: string) {
    return this.httpClient
      .post<TokenResponseDto>(
        this.apiUrl + '/auth/login',
        {
          email,
          password,
        },
        {
          params: {
            appId: this.session.getSession().loggedAppId ?? '',
          },
        }
      )
      .pipe(
        tap((value) => {
          this.tokenService.setAuthTokens({
            accessToken: value.accessToken,
            refreshToken: value.refreshToken,
          });
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          console.error('Erro no refresh:', error);
          return throwError(() => error);
        })
      );
  }

  refresh(refreshToken: string) {
    const result = this.httpClient
      .post<TokenResponseDto>(this.apiUrl + '/auth/refresh-token', {
        refreshToken,
      })
      .pipe(
        tap((value) => {
          this.tokenService.setAuthTokens({
            accessToken: value.accessToken,
            refreshToken: value.refreshToken,
          });
        }),
        catchError((error) => {
          console.error('Erro no refresh:', error);
          return throwError(() => error);
        })
      );
    return result;
  }

  checkAuth() {
    const token = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (token) {
      return this.session.findSession().pipe(
        map(() => true),
        catchError(() => of(false))
      );
    }

    if (refreshToken) {
      return this.refresh(refreshToken).pipe(
        map(() => true),
        catchError(() => of(false))
      );
    }

    return of(false);
  }
}
