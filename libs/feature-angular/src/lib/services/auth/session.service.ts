import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SessionResponseDto } from '@pure-workspace/domain';
import { environment } from '../../environments';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private httpClient = inject(HttpClient);
  private session: Partial<SessionResponseDto> = {};

  apiUrl = environment.apiUrl;

  getSession() {
    return this.session;
  }

  updateSession(session: Partial<SessionResponseDto>) {
    this.session = { ...this.session, ...session };
  }

  clearSession() {
    this.session = {};
  }

  findSession() {
    return this.httpClient
      .get<SessionResponseDto>(this.apiUrl + '/auth/session', {
        params: {
          appId: this.session.loggedAppId ?? '',
        },
      })
      .pipe(
        tap((value) => {
          this.updateSession(value);
        }),
        catchError((error) => {
          console.error('Error in seach session:', error);
          return throwError(() => error);
        })
      );
  }
}
