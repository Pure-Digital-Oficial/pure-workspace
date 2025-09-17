import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { TokenService, AuthService, SessionService } from '../../services';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const sessionService = inject(SessionService);

  const authToken = storageService.getToken();
  const refreshToken = storageService.getRefreshToken();

  if (authToken) {
    return sessionService.findSession().pipe(
      map(() => true),
      catchError(() => of(router.createUrlTree(['/login'])))
    );
  }

  if (refreshToken) {
    return authService.refresh(refreshToken).pipe(
      map(() => true),
      catchError(() => of(router.createUrlTree(['/login'])))
    );
  }

  return router.createUrlTree(['/login']);
};
