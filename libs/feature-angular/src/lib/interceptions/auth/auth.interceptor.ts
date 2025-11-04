import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  switchMap,
  throwError,
  filter,
  take,
  tap,
  BehaviorSubject,
} from 'rxjs';
import { AuthService, TokenService } from '../../services';
import { environment } from '../../environments';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  const accessToken = tokenService.getToken();
  const refreshToken = tokenService.getRefreshToken();

  // 🚫 Ignores authentication endpoints (login and refresh)
  if (isAuthEndpoint(req.url)) {
    return next(req);
  }

  // 🔹 If have an access token, it sends normally
  if (accessToken) {
    const authReq = addAuthHeader(req, accessToken);
    return next(authReq).pipe(
      catchError((error) =>
        handleRequestError(
          error,
          req,
          next,
          authService,
          tokenService,
          refreshToken
        )
      )
    );
  }

  // 🔹If you don't have an accessToken but you do have a refreshToken, try updating it first
  if (!accessToken && refreshToken) {
    return handleRefreshBeforeRequest(
      req,
      next,
      authService,
      tokenService,
      refreshToken
    );
  }

  return next(req);
};

function addAuthHeader(req: HttpRequest<unknown>, token: string) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handleRequestError(
  error: HttpErrorResponse,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  tokenService: TokenService,
  refreshToken?: string | null
) {
  if (error.status === 401 && refreshToken) {
    // Avoids multiple simultaneous refreshes
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refresh(refreshToken).pipe(
        tap((res) => {
          isRefreshing = false;
          tokenService.setAuthTokens({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          refreshTokenSubject.next(res.accessToken);
        }),
        switchMap((res) => {
          const newReq = addAuthHeader(req, res.accessToken);
          return next(newReq);
        }),
        catchError((err) => {
          console.error('❌ Error when trying to refresh:', err);
          isRefreshing = false;
          authService.logout();
          refreshTokenSubject.next(null);
          return throwError(() => err);
        })
      );
    } else {
      // Please wait for the ongoing refresh to finish
      return refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          const cloned = addAuthHeader(req, token);
          return next(cloned);
        })
      );
    }
  }

  return throwError(() => error);
}

function handleRefreshBeforeRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  tokenService: TokenService,
  refreshToken: string
) {
  if (isRefreshing) {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addAuthHeader(req, token)))
    );
  }

  isRefreshing = true;
  refreshTokenSubject.next(null);

  return authService.refresh(refreshToken).pipe(
    tap((res) => {
      isRefreshing = false;
      tokenService.setAuthTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      refreshTokenSubject.next(res.accessToken);
    }),
    switchMap((res) => next(addAuthHeader(req, res.accessToken))),
    catchError((err) => {
      console.error('❌ Error refreshing before request:', err);
      isRefreshing = false;
      refreshTokenSubject.next(null);
      authService.logout();
      return throwError(() => err);
    })
  );
}

function isAuthEndpoint(url: string): boolean {
  const baseUrl = environment.apiUrl;
  const endpointsToIgnore = ['/auth/login', '/auth/refresh-token'];
  return endpointsToIgnore.some((path) => url.includes(baseUrl + path));
}
