import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SetCookie } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  private cookieService = inject(CookieService);

  setCookie(input: SetCookie) {
    const { name, value, days, minutes, path } = input;
    const cookiePath = path ?? '/';

    let expires: Date | undefined;

    if (minutes !== undefined) {
      expires = new Date();
      expires.setTime(expires.getTime() + minutes * 60 * 1000);
    } else if (days !== undefined) {
      expires = new Date();
      expires.setDate(expires.getDate() + days);
    }

    this.cookieService.set(name, value, expires, cookiePath);
  }

  getCookie(name: string) {
    const value = this.cookieService.get(name);

    return value ? value : null;
  }

  deleteCookie(input: Pick<SetCookie, 'name' | 'path'>) {
    const { name, path } = input;
    const defaultPath = path ? path : '/';
    this.cookieService.delete(name, defaultPath);
  }

  deleteCookies(input: Pick<SetCookie, 'name' | 'path'>[]) {
    for (const item of input) {
      this.deleteCookie(item);
    }
  }
}
