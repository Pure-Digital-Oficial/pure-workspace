import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
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
          this.session.findSession().subscribe();
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
          this.session.findSession().subscribe();
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          console.error('Erro no refresh:', error);
          return throwError(() => error);
        })
      );
    return result;
  }
}
