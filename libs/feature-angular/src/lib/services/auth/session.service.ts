import { Injectable } from '@angular/core';
import { SessionResponseDto } from '@pure-workspace/domain';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private session: Partial<SessionResponseDto> = {};

  getSession() {
    return this.session;
  }

  updateSession(session: Partial<SessionResponseDto>) {
    this.session = { ...this.session, ...session };
  }

  clearSession() {
    this.session = {};
  }
}
