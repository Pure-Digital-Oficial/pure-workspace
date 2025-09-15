import {
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStorageService } from '../../services';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(SessionStorageService);

  const cloneReq = getRequestWithUpdatedToken(req, tokenService);

  return next(cloneReq);
};

const getRequestWithUpdatedToken = (
  req: HttpRequest<unknown>,
  storageService: SessionStorageService
) => {
  const token = storageService.getToken();
  if (!token) return req;

  const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
  return req.clone({
    headers,
  });
};
