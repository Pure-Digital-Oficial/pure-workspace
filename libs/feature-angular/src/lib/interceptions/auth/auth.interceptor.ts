import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService, TokenService } from '../../services';
import { environment } from '../../environments';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  const accessToken = tokenService.getToken();
  const refreshToken = tokenService.getRefreshToken();

  // 🚫 Ignore request of login and refresh
  if (isAuthEndpoint(req.url)) {
    return next(req);
  }

  // 🔹 If not have accessToken, try refresh before send the request
  if (!accessToken && refreshToken) {
    console.log('Passou aqui');
    return handleRefreshBeforeRequest(req, next, authService, refreshToken);
  }

  // 🔹 If already have an accessToken, send it normally
  const authReq = addAuthHeader(req, accessToken as string);
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) =>
      handleRequestError(error, req, next, authService, refreshToken)
    )
  );
};

function addAuthHeader(req: HttpRequest<unknown>, token?: string) {
  return req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}

function handleRefreshBeforeRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  refreshToken: string
) {
  return authService.refresh(refreshToken).pipe(
    switchMap((response) => {
      const cloned = addAuthHeader(req, response.accessToken);
      return next(cloned);
    }),
    catchError((err) => {
      console.error('Erro no refresh antes da requisição:', err);
      authService.logout();
      return throwError(() => err);
    })
  );
}

function handleRequestError(
  error: HttpErrorResponse,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  refreshToken?: string | null
) {
  if (error.status === 401 && refreshToken) {
    return authService.refresh(refreshToken).pipe(
      switchMap((response) => {
        const newReq = addAuthHeader(req, response.accessToken);
        return next(newReq);
      }),
      catchError((refreshErr) => {
        console.error('Erro ao tentar refresh após 401:', refreshErr);
        authService.logout();
        return throwError(() => refreshErr);
      })
    );
  }

  return throwError(() => error);
}

function isAuthEndpoint(url: string): boolean {
  const baseUrl = environment.apiUrl;
  const endpointsToIgnore = ['/auth/login', '/auth/refresh-token'];
  return endpointsToIgnore.some((path) => url.includes(baseUrl + path));
}
