import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SessionResponseDto } from '@pure-workspace/domain';
import { environment } from '../../environments';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private httpClient = inject(HttpClient);
  private _session = signal<Partial<SessionResponseDto>>({});
  apiUrl = environment.apiUrl;

  session = this._session.asReadonly();

  getSession() {
    return this._session();
  }

  updateSession(session: Partial<SessionResponseDto>) {
    this._session.set({ ...this._session(), ...session });
  }

  clearSession() {
    this._session.set({});
  }

  findSession() {
    if (this._session().id) {
      return of(this._session());
    }

    return this.httpClient
      .get<SessionResponseDto>(`${this.apiUrl}/auth/session`, {
        params: { appId: this._session().loggedAppId ?? '' },
      })
      .pipe(
        tap((value) => this.updateSession(value)),
        catchError((error) => {
          console.error('Error in search session:', error);
          return throwError(() => error);
        })
      );
  }
}
