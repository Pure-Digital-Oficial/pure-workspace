import {
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  const cloneReq = getRequestWithUpdatedToken(req, tokenService);

  return next(cloneReq);
};

const getRequestWithUpdatedToken = (
  req: HttpRequest<unknown>,
  tokenService: TokenService
) => {
  const token = tokenService.getToken();
  if (!token) return req;

  const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
  return req.clone({
    headers,
  });
};
